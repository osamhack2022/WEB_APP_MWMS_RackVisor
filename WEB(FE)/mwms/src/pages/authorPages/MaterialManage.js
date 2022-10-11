import EditableText from '../../utils/text/EditableText'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput';
import Example from '../../components/simple_striped';
import WarehouseGridLayout from '../../utils/grid/WarehouseMaterial'


function MaterialManage() {
  const auth =useAuth();


  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <div> 물자 관리 </div>
          <div class="grid grid-cols-2 divide-x-2 gap-4 px-4 py-3 border-gray-200 bg-gray">
            <div>
              <SearchInput/>
              <Example/> 
              <button class="w-50 h-20 mb-2 text-xl font-medium border-2" onClick={() => {console.log("TODO: 물자 추가 모달 구현")}}>물자 추가 +</button>
            </div>
            <div class="gap-2">
              <span class="m-2 p-2 font-bold">위치 기반 물자 관리</span> <br /> 
              <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> 1종창고 <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
              <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                  <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1종창고</a>
                  </li>
                  <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">2종창고</a>
                  </li>
                  <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">3종창고</a>
                  </li>
                  <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">4종창고</a>
                  </li>
                  </ul>
              </div>
              <WarehouseGridLayout /> {/* TODO: box 클릭했을때 1,2,3층별로 나눠진 modal 추가 하기 */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MaterialManage