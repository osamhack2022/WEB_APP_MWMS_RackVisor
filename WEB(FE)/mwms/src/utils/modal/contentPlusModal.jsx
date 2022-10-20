/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export default function ContentPlusModal({open, setOpen, title, setTitle, content, setContent, makePost}) {
  useEffect(() => {
    
  }, [])
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
            <div className="inline-block align-bottom bg-black-gradient rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-primary-900 rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-semibold text-white">
                    게시물 등록
                  </Dialog.Title>
                  <div className="flex-1">
                    <div>
                      <input value={title} onChange={setTitle} className="inline-flex justify-center text-sm text-gray-200 border bg-gray-700 w-[420px] m-1" placeholder='제목'/>
                    </div>
                    <div>
                      <textarea value={content} onChange={setContent} className="inline-flex justify-center text-sm text-gray-200 border bg-gray-700 w-[420px] h-[200px] m-1" placeholder='내용'></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-blue-gradient text-base font-medium text-black hover:text-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => makePost()}
                >
                  저장
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false)}}
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
