import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput'
import WarehouseGridLayout from '../../utils/grid/WarehouseMaterial'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { getLSUnitList } from './UnitSelect'
import { vi } from 'date-fns/locale'
import SelectBoxModal from '../../utils/modal/SelectBoxModal'
import CreateList from '../../utils/cabinet/Cabinet'
import ExcelModal from '../../utils/modal/ExcelModal'
import ManageList from '../../components/ManageList'
import MaterialManageModal from '../../utils/modal/MaterialManageModal'
import MaterialChangeModal from '../../utils/modal/MaterialChangeModal'

function MaterialManage() {
  const auth =useAuth();
  const navigate = useNavigate();
  const [houList, setHouList] = useState([]);
  const [selHouse, setSelHouse] = useState("");
  const [grid, setGrid] = useState([]);
  const [itm, setItm] = useState([]);
  const [visual, setVisual] = useState({});
  const [cabSelec, setCabSelec] = useState("");
  const [boxSelec, setBoxSelec] = useState("");
  const [open, setOpen] = useState(false);
  const valList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const data = [{'이름' : '휴지', '종류' : '2종', '세부분류' : '기타물자류', '수량':1000, '상태':'좋음', '기한':'2022/10/27'}]
  const [material, setMaterial] = useState({});
  const [openPlus, setOpenPlus] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("부대") === "") {
      alert("부대를 선택해주세요");
      navigate("/");
    }
    // TODO: 서버로부터 unit(부대) 불러와야함...
    let unitName = localStorage.getItem("부대");
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
    let unitName = localStorage.getItem("부대");
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

    setGrid(lsGridLayout);
    setItm(lsItems);

  }, [selHouse])

  const onSelHouse = (e) => {
    setSelHouse(e.currentTarget.value);
    let viCopy = visual;
    viCopy[selHouse] = false;
    viCopy[e.currentTarget.value] = true;
    setVisual(viCopy);
  }

  const testClick = (i) => {
    setCabSelec(i);
  }

  const openMaterialChange = (i) => {
    if (i == false) {
      setMaterial();
    }
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
              <button onClick={() => setOpen(true)}>excel로 업로드</button>
              <ExcelModal open={open} setOpen={setOpen}/>
              <button class="w-50 h-20 mb-2 text-xl font-medium border-2" onClick={() => setOpenPlus(true)}>물자 추가 +</button>
              <MaterialManageModal open={openPlus} setOpen={setOpenPlus} />
              {boxSelec ? 
              (
              <>
                <div>선택된 박스 {boxSelec}</div>
                <ManageList defaultList={valList} data={data} setSelect={setMaterial}/>
                <MaterialChangeModal open={material} setOpen={openMaterialChange} materialInfo={material}/>
              </>) : 
              ("")}
            </div>
            <div class="gap-2 overflow-x-auto">
              {cabSelec ? 
              (<>
                <button onClick={() => {
                  setCabSelec("");
                  setBoxSelec("")}}>뒤로가기</button>
                <CreateList boxSelec={boxSelec} setBoxSelec={setBoxSelec}/>
               </>
              ) 
              : (<>
                <span class="m-2 p-2 font-bold">위치 기반 물자 관리</span> <br/> 
                <select onChange={onSelHouse} value={selHouse}>
                  <option value={""} key={"none"}>
                    없음
                  </option>
                  {houList.map((hou) => (
                    <option value={hou.name} key={hou.name}>
                      {hou.name}
                    </option>
                  ))}
                </select>
                {houList.map((hou) => (
                  visual[hou.name] && <WarehouseGridLayout unitSelected={localStorage.getItem("부대")} houseSelected={hou.name} setClick={testClick}/>
                ))}
              </>)
              }
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MaterialManage