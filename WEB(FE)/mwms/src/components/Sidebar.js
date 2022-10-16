import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside class="w-48" aria-label="Sidebar">
      <div class="overflow-y-auto h-full py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul class="space-y-2">
            <li>
              <Link to="/main" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="ml-3">메인</span>
              </Link>
            </li>
            <li>
              <Link to="/materialManage" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">물자 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/houseSelect" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">창고 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/history" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">히스토리</span>
              </Link>
            </li>
            <li>
              <Link to="/barcode" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">QR코드 관리</span>
              </Link>
            </li>
            <li>
              <Link to="/static" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">통계</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/cost" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">청구하기</span>
              </Link>
            </li> */}
            <li>
              <Link to="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">{'<-'}다시 부대 선택</span>
              </Link>
            </li>
          </ul>
      </div>
    </aside>
  )
}

export default Sidebar