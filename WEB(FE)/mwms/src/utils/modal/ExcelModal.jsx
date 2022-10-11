/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export default function ExcelModal({open, setOpen}) {
  const gridOptions = {
    columnDefs: [
      { field: 'athlete', minWidth: 180 },
      { field: 'age' },
      { field: 'country', minWidth: 150 },
      { field: 'year' },
      { field: 'date', minWidth: 130 },
      { field: 'sport', minWidth: 100 },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ],
  
    defaultColDef: {
      resizable: true,
      minWidth: 80,
      flex: 1,
    },
  
    rowData: [],
  };
  
  // XMLHttpRequest in promise format
  function makeRequest(method, url, success, error) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url, true);
    httpRequest.responseType = 'arraybuffer';
  
    httpRequest.open(method, url);
    httpRequest.onload = function () {
      success(httpRequest.response);
    };
    httpRequest.onerror = function () {
      error(httpRequest.response);
    };
    httpRequest.send();
  }
  
  // read the raw data and convert it to a XLSX workbook
  function convertDataToWorkbook(dataRows) {
    /* convert data to binary string */
    var data = new Uint8Array(dataRows);
    var arr = [];
  
    for (var i = 0; i !== data.length; ++i) {
      arr[i] = String.fromCharCode(data[i]);
    }
  
    var bstr = arr.join('');
  
    //return XLSX.read(bstr, { type: 'binary' });
  }
  
  // pull out the values we're after, converting it into an array of rowData
  
  function populateGrid(workbook) {
    // our data is in the first sheet
    var firstSheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[firstSheetName];
  
    // we expect the following columns to be present
    var columns = {
      A: 'athlete',
      B: 'age',
      C: 'country',
      D: 'year',
      E: 'date',
      F: 'sport',
      G: 'gold',
      H: 'silver',
      I: 'bronze',
      J: 'total',
    };
  
    var rowData = [];
  
    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;
  
    // iterate over the worksheet pulling out the columns we're expecting
    while (worksheet['A' + rowIndex]) {
      var row = {};
      Object.keys(columns).forEach(function (column) {
        row[columns[column]] = worksheet[column + rowIndex].w;
      });
  
      rowData.push(row);
  
      rowIndex++;
    }
  
    // finally, set the imported rowData into the grid
    gridOptions.api.setRowData(rowData);
  }
  
  function importExcel() {
    makeRequest(
      'GET',
      'https://www.ag-grid.com/example-assets/olympic-data.xlsx',
      // success
      function (data) {
        var workbook = convertDataToWorkbook(data);
  
        populateGrid(workbook);
      },
      // error
      function (error) {
        throw error;
      }
    );
  }

  const readExcel = () => {
    
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    엑셀 파일 업로드
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      엑셀 파일을 업로드해주세요.
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  저장
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
