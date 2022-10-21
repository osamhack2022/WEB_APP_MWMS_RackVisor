import React from 'react'
import { Link } from 'react-router-dom'

const sidebarButtonList = [
  {link : "/main", name : "메인", index: 0,},
  {link : "/materialManage", name : "물자 관리", index:1,},
  {link : "/houseSelect", name : "창고 관리", index:2,},
  {link : "/history", name : "히스토리", index:3,},
  {link : "/barcode", name : "QR코드 관리", index:4,},
  {link : "/static", name : "통계", index:5,},
  {link : "/", name : "< 부대 선택", index:5,},
]

function Sidebar() {


  return (
    <aside class="w-48 h-screen" aria-label="Sidebar">
      <div class="overflow-y-auto h-full py-4 px-3 bg-[#202020] drop-shadow-2xl">
          <ul class="space-y-2">
            {
              sidebarButtonList.map(button => (
                <li>
                  <Link to={button.link} class="flex items-center p-2 text-base font-normal font-poppins text-white rounded-lg hover:bg-[#7A5EA6] ">
                    <span class="ml-3">{button.name}</span>
                  </Link>
                </li>
              ))
            }
            
            {/* <li>
              <Link to="/cost" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span class="flex-1 ml-3 whitespace-nowrap">환경설정</span>
              </Link>
            </li> */}

          </ul>
      </div>
    </aside>
  )
}

export default Sidebar