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

export default function ExcelModal({open, setOpen}) {
  const [data, setData] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [loc, setLoc] = useState({위치 : ""});
  const valList = ['이름', '종류', '세부분류', '수량', '상태', '기한']

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
    });
  }

  useEffect(() => {
    setData([]);
  }, [open]);

  const save = async () => {
    
    setOpen(false)
    setData([]);
    setLoc({위치 : ""});
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
            <div className="inline-block align-bottom bg-black-gradient rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:p-6">
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
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white my-2">
                    엑셀 파일 업로드
                  </Dialog.Title>
                  <div className="mt-2 flex">
                    <p className="text-md text-gray-500">
                      엑셀 파일을 업로드해주세요.
                    </p>
                    <ExcelExampleFile/>
                  </div>
                  <input 
                    accept=".xlsx" 
                    className="my-2 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-[#706f6f] text-base font-medium text-gray-400 hover:text-gray-300  sm:mt-0 sm:w-auto sm:text-sm"
                    type="file" 
                    onChange={(e) => inputFile(e.target.files[0])}/>
                  <div>
                    <button class="border text-gray-200 rounded-lg my-2 p-2" onClick={() => setOpen1(true)}>위치 선택하기</button>
                    <LocationSelectModal open={open1} setOpen={setOpen1} setLocation={setLoc}/>
                    {loc['위치'] && <div>{loc['위치']}</div>}
                  </div>
                    <SimpleSearch defaultList={valList} data={data}/>
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
                    setLoc({위치 : ""});
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
