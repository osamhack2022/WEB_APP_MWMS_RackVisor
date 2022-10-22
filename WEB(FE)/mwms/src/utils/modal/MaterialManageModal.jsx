/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import LocationSelectModal from './LocationSelectModal'
import "../search/datapicker.css";
import {detailType} from '../search/typeList'
import { ko } from "date-fns/esm/locale";
import DatePicker, { registerLocale } from 'react-datepicker';

export default function MaterialManageModal({open, setOpen}) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [loc, setLoc] = useState("");
  const [Content, setContent] = useState("없음");
  const [type, setType] = useState("없음");
  const [minCnt, setMinCnt] = useState("");
  const [people, setPeople] = useState(localStorage.getItem("계급") + " " + localStorage.getItem("이름"));
  const [name, setName] = useState("");
  const [good, setGood] = useState("");
  const [startDate, setStartDate] = useState(new Date()); //날짜 형식에 맞춰서 파싱해야함


  const chgMinCnt = (e) => {
    setMinCnt(e.currentTarget.value);
  }

  const chgName = (e) => {
    setName(e.currentTarget.value);
  }

  const chgGood = (e) => {
    setGood(e.currentTarget.value);
  }

  const onChangeHanlder = (e) => {
  	setContent(e.currentTarget.value);
  }
  const onChangeType = (e) => {
    setType(e.currentTarget.value);
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-black-gradient rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-[#323232] rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white mx-2">
                    물품 수정
                  </Dialog.Title>
                  <div className="mt-2 text-white">
                    <button class="my-1" onClick={() => setLocationOpen(true)}>위치 선정하기</button>
                    {loc && <div>선정된 위치 {loc['위치']}</div>}
                    {[<LocationSelectModal open={locationOpen} setOpen={setLocationOpen} setLocation={setLoc}/>]}

                    <div>
                      <div class="flex">
                        <div>속성 : </div>
                        <div>
                          <select class="bg-[#706f6f] mx-2 my-1" onChange={onChangeHanlder} value={Content}>
                            {Object.keys(detailType).map((type) => (
                              <option key={type}>{type}</option>
                            ))}
                          </select>
                          <select class="bg-[#706f6f] mx-2 my-1" onChange={onChangeType} value={type}>
                            {Object.keys(detailType[Content]).map((ty) => (
                              <option key={ty}>{ty}</option>
                            ))}
                          </select>
                          <div>{detailType[Content][type]}</div>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="mr-2">기한 : </div>
                        <DatePicker 
                          locale={ko}
                          dateFormat="yyyy/MM/dd"
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                          }}
                          selectsStart
                        />
                      </div>
                      <div class="flex">
                        <div>이름 : </div>
                        <input type="string" class="border rounded-md bg-[#706f6f] mx-2 my-1 mt-1" value={name} onChange={chgName}/>
                      </div>
                      <div class="flex">
                        <div>상태 : </div>
                        <input type="string" class="border rounded-md bg-[#706f6f] mx-2 my-1" value={good} onChange={chgGood}/>
                      </div>
                      <div class="flex">
                        <div class="my-1">담당자 : {people}</div>
                      </div>
                      <div class="flex">
                        <div>{'수량 : '}</div>
                        <input type="number" class="border rounded-md bg-[#706f6f] mx-2 my-1" value={minCnt} onChange={chgMinCnt}/>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-[#7A5EA6] hover:bg-[#9d79d4] text-white text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    alert("물품이 추가되었습니다");
                  }}
                >
                  저장
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-800 hover:bg-gray-600 text-base font-medium text-white sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
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
