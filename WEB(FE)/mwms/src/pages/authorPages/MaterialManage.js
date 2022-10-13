import EditableText from '../../utils/text/EditableText'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput'
import Example from '../../components/simple_striped'
import WarehouseGridLayout from '../../utils/grid/WarehouseMaterial'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getLSUnitList } from './UnitSelect'

function MaterialManage() {
  const auth =useAuth();
  const navigate = useNavigate();
  const [houList, setHouList] = useState([]);
  const [selHouse, setSelHouse] = useState("");

  useEffect(() => {
    if(auth.unitSelected === "") {
      alert("부대를 선택해주세요");
      navigate("/");
    }
    // TODO: 서버로부터 unit(부대) 불러와야함...
    let unitName = auth.unitSelected;
    let lsUnitList=  getLSUnitList();
    let lsUnit = lsUnitList.find( (e) => (e.name === unitName) );
    let hl;
    if(lsUnit === undefined)
    {
      hl = []
    }
    else
    {
      hl = lsUnit.houseList;
    }
    setHouList(hl);
  }, [])



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
              {/* <Example/>  */}
              <button class="w-50 h-20 mb-2 text-xl font-medium border-2" onClick={() => {console.log("TODO: 물자 추가 모달 구현")}}>물자 추가 +</button>
            </div>
            <div class="gap-2">
              <span class="m-2 p-2 font-bold">위치 기반 물자 관리</span> <br /> 
              {/* <DropdownButton id="dropdown-basic-button" title="창고를 선택하세요">
              {hl.map((h) => (
                <Dropdown.Item href="#/action">{h.name}</Dropdown.Item> 
              ))}
              </DropdownButton> */}
              <select onChange={(e) => setSelHouse(e.target.value)} value={selHouse}>
                {houList.map((hou) => (
                  <option value={hou.name} key={hou.name}>
                    {hou.name}
                  </option>
                ))}
              </select>
              { selHouse &&
                <WarehouseGridLayout unitSelected={auth.unitSelected} houseSelected={selHouse}/>
              } {/* TODO: box 클릭했을때 1,2,3층별로 나눠진 modal 추가 하기 */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MaterialManage