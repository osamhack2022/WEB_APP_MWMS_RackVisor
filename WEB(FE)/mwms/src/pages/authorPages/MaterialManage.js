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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
              <DropdownButton id="dropdown-basic-button" title="1종창고">
                <Dropdown.Item href="#/action-1">1종창고</Dropdown.Item>
                <Dropdown.Item href="#/action-2">2종창고</Dropdown.Item>
                <Dropdown.Item href="#/action-3">3종창고</Dropdown.Item>
              </DropdownButton>
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