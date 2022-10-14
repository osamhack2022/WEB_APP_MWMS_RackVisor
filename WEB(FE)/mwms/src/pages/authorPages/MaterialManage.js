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
import { vi } from 'date-fns/locale'

function MaterialManage() {
  const auth =useAuth();
  const navigate = useNavigate();
  const [houList, setHouList] = useState([]);
  const [selHouse, setSelHouse] = useState("");
  const [grid, setGrid] = useState([]);
  const [itm, setItm] = useState([]);
  const [visual, setVisual] = useState({});

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
    if (lsUnit === undefined) {
      hl = []
    } else {
      hl = lsUnit.houseList;
    }
    setHouList(hl);

    let visualJ = {};
    hl.map((ttt) => {
      console.log("ttt" + JSON.stringify(ttt));
      visualJ[ttt.name] = false;
    });
    console.log("JJ" + JSON.stringify(visualJ));
    setVisual(visualJ);

  }, []);

  useEffect(() => {
    let unitName = auth.unitSelected;
    let lsGridLayout = [];
    let lsItems = [];
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
      if (selHouse == "") {
        lsGridLayout = [];
        lsItems = [];
      }

      else {
        let house = hl.find( (e) => (e.name == selHouse) );
        if( house != undefined )
        {
          lsGridLayout = house.gridLayout;
          lsItems = house.items;
        }
      }
 
    }
    console.log("여기다임마 + " + JSON.stringify(lsGridLayout));
    console.log("여기다임마 + " + JSON.stringify(lsItems));
    
    setGrid(lsGridLayout);
    setItm(lsItems);

  }, [selHouse])

  const onSelHouse = (e) => {
    setSelHouse(e.currentTarget.value);
    let viCopy = visual;
    viCopy[selHouse] = false;
    viCopy[e.currentTarget.value] = true;
    setVisual(viCopy);
    console.log("왜작동안함");
  }

  const testClick = (i) => {
    alert("여기서" + i);
  }

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

              <select onChange={onSelHouse} value={selHouse}>
                <option value={"ttt"} key={"ttt"}>
                  없음
                </option>
                {houList.map((hou) => (
                  <option value={hou.name} key={hou.name}>
                    {hou.name}
                  </option>
                ))}
              </select>

              {houList.map((hou) => (
                visual[hou.name] && <WarehouseGridLayout unitSelected={auth.unitSelected} houseSelected={hou.name} setClick={testClick}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MaterialManage