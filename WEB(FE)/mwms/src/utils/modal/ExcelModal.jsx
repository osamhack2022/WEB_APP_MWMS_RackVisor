/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import FileSaver, { saveAs } from 'file-saver'
import ExcelExampleFile from './ExcelExampleFile'
import readXlsxFile from 'read-excel-file'
import { useEffect } from 'react'
import SimpleSearch from '../../components/SimpleSearchList'
import LocationSelectModal from './LocationSelectModal'
import { useAuth } from '../../routes/AuthContext'
import { axiosPost, axiosPut } from '../../api'

export default function ExcelModal({open, setOpen}) {
  const auth = useAuth();
  const currUnit = auth.unitSelected;
  const [data, setData] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [loc, setLoc] = useState();
  const valList = ['name', 'type', 'specipicType', 'amount', 'comment', 'expirationDate']
  const korList = ['이름', '종류', '세부분류', '수량', '상태', '기한']

  const inputFile = (file) => {
    readXlsxFile(file).then((rows) => {
      var newInput = []
      rows.forEach((row, index) => {
        if (index != 0) {
          let newThing = {}
          row.forEach((elem, index) => {
            newThing[valList[index]] = elem
          })
          newInput.push(newThing)
        }
      })
      setData(newInput)
      console.log(newInput);
    });
  }

  useEffect(() => {
    setData([]);
  }, [open]);


  const onSaveHandle = async (da) => {    
    let itemToAdd = {
      name : da.name,
      type : "TYPE_" + (da.type == "없" ? "NULL" : (da.type[0])),
      specipicType : da.specipicType,
      amount : Number(da.amount),
      barcode : "string",
      comment : da.comment,
      expirationDate : da.expirationDate,
      storedBoxId : Number(loc),
      createdUserId: localStorage.getItem('id')
    }

    let itemToHistory = {
      content : da.name + " " + (da.amount).toString() + " " + "plus",
      unitId : Number(currUnit.id)
    }
    try {
      let response = await axiosPost("/stocks/", itemToAdd);
      response.barcode = "m" + (response.id).toString();
      await axiosPut("/stocks/stock-update", response);


      await axiosPost("/historys/", itemToHistory);

    } catch(e) {
      alert("오류가 발생했습니다")
    }
  }

  const save = () => {
    try {
      data.map((da) => {
          if (da.name && da.type && da.specipicType && da.amount && da.comment && da.expirationDate && loc) onSaveHandle(da);
      });
      alert("물품이 추가되었습니다");
    } catch (e) {
      alert("오류가 발생했습니다");
    }

    setOpen(false)
    setData([]);
    setLoc();
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black-gradient rounded-lg px-4 pt-5 pb-4 text-left overflow-x-auto shadow-xl transform transition-all sm:align-middle sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-[#323232] rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    setOpen(false)
                    setData([]);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="flex justify-between">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white my-2">
                    엑셀 파일 업로드
                  </Dialog.Title>
                  <ExcelExampleFile/>
                  </div>
                  <div class="flex">
                  <label for = "file-upload" class="text-[#5AB0AD] hover:text-white my-1 text-sm"> 엑셀 업로드하기</label>
                  {(data.length == 0) ? "" : <div class="text-white ml-5 mt-[4px] text-sm ">{' - '}&nbsp;&nbsp;&nbsp;파일 선택됨</div> }
                  </div>
                  <input 
                    accept=".xlsx" 
                    className="hidden my-2 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-[#706f6f] text-base font-medium text-gray-400 hover:text-gray-300  sm:mt-0 sm:w-auto sm:text-sm"
                    type="file" 
                    onChange={(e) => inputFile(e.target.files[0])}
                    id="file-upload"/>
                  <div class="flex">
                    <button class="text-[#5AB0AD] hover:text-white my-1 text-sm " onClick={() => setOpen1(true)}>위치 선택하기</button>
                    <LocationSelectModal open={open1} setOpen={setOpen1} setLocation={setLoc}/>
                    {loc && <div class="text-white ml-5 mt-[4px] text-sm ">&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;위치 선택됨</div>}
                  </div>
                    <SimpleSearch defaultList={valList} data={data} korList={korList}/>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-[#7A5EA6] hover:bg-[#9d79d4] text-white text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => save()}
                >
                  저장
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-800 hover:bg-gray-600 text-base font-medium text-white hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {setOpen(false)
                    setData([]);
                    setLoc();
                  }}
                >
                  취소
                </button>
              </div>
            </div>
            
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
