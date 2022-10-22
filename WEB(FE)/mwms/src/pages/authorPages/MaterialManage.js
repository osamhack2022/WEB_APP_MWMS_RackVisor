  import React, { useCallback, useContext, useEffect, useState } from 'react'
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
import LocationSelectModal from '../../utils/modal/LocationSelectModal'
import Tabs from '../../components/Tabs'
import { axiosGet } from '../../api'


function MaterialManage() {
  const auth =useAuth();
  const navigate = useNavigate();
  const [houList, setHouList] = useState([]);
  const [selHouse, setSelHouse] = useState("");
  const [visual, setVisual] = useState({});
  const [cabSelec, setCabSelec] = useState("");
  const [boxSelec, setBoxSelec] = useState("");
  const [open, setOpen] = useState(false);
  const valList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const data = [{'이름' : '휴지', '종류' : '2종', '세부분류' : '기타물자류', '수량':1000, '상태':'좋음', '기한':'2022/10/27'}]
  const [material, setMaterial] = useState({'이름' : "", "종류" : "없음", "세부분류" : "없음", "수량" : "", "상태" : "", "기한" : ""});
  const [openPlus, setOpenPlus] = useState(false);
  const [materialChangeOpen, setMaterialChangeModal] = useState(false);
  const [loc, setLoc] = useState({});
  const [tabType, setTabType] = useState("material");
  const currUnit = auth.unitSelected;

  const fetchHouseList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouse/my-warehouses" + (currUnit.id).toString());
      let visualJ = {};
      data.map((da) => {
        visualJ[da.id] = false;
      })
      setVisual(visualJ);
    } catch (error) {
      alert("Error on feching house");
    }
  }, []);

  useEffect(() => {
    if(!currUnit) {
      //alert("부대를 선택해주세요");
      //navigate("/");
    }

    //fetchHouseList();
  }, []);

  const onSelHouse = (e) => {
    setSelHouse(houList.find((hou) => (hou.id == e.currentTarget.value)));

    let viCopy = visual;
    viCopy[selHouse.id] = false;
    viCopy[e.currentTarget.value] = true;
    
    setVisual(viCopy);
  }

  const testClick = (i) => {
    setCabSelec(i);
  }

  const materialHandle = (e) => {
    setMaterial(e);
    setMaterialChangeModal(true);
  }

  const closeChangeModalClose = () => {
    setMaterialChangeModal(false);
    setMaterial({'이름' : "", "종류" : "없음", "세부분류" : "없음", "수량" : "", "상태" : "", "기한" : ""});
  }

  const defaultTabs = [
    { name: '이름 기반 탐색', value: 'material', current: true },
    { name: '위치 기반 탐색', value: 'box', current: false },
  ]

  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1 bg-[#323232]">
          <div class="flex grid grid-cols-2 divide-x-2 gap-4 px-4 py-3 border-gray-200 bg-gray">
            <div class="flex-1">
              <Tabs defaultTabs={defaultTabs} setTabType={setTabType}/>
              <div>
                {tabType == "material" && <><SearchInput/></>}
                {boxSelec ? ( <> {tabType == "box" && <div>창고 : {selHouse} - 선반 : {cabSelec} -  박스 : {boxSelec}</div>} </> ) : ("")}
                {tabType == "box" && 
                  <div class="flex-1 gap-2 overflow-x-auto">
                    {cabSelec ? (<>
                      <button onClick={() => {
                        setCabSelec("");
                        setBoxSelec("")}}>뒤로가기</button>
                      <CreateList boxSelec={boxSelec} setBoxSelec={setBoxSelec}/>
                      </>)
                    : (<>
                      <span class="m-2 p-2 font-bold">위치 기반 물자 관리</span> <br/> 
                      <select onChange={onSelHouse} value={selHouse}>
                        <option value={""} key={"none"}>
                          없음
                        </option>
                        {houList.map((hou) => (
                          <option value={hou.id} key={hou.name}>
                            {hou.name}
                          </option>
                        ))}
                      </select>
                      {houList.map((hou) => (
                        visual[hou.id] && <WarehouseGridLayout unitSelected={currUnit} houseSelected={hou.name} setClick={testClick}/>
                      ))}
                    </>)
                    }
                  </div>
                }
                <button class="text-[#5AB0AD] font-semibold ml-3 mb-3 w-30 h-10  rounded p-2" onClick={() => setOpen(true)}>excel로 업로드</button>
                <ExcelModal open={open} setOpen={setOpen}/>
                <button class="text-[#5AB0AD]  font-semibold ml-3 mb-3 w-30 h-10 rounded p-2" onClick={() => setOpenPlus(true)}>물자 추가 +</button>
                <MaterialManageModal open={openPlus} setOpen={setOpenPlus} />
              </div>
            </div>
            { (boxSelec || tabType == "material") && 
                (<>
                  <ManageList defaultList={valList} data={data} setSelect={materialHandle}/>
                  <MaterialChangeModal open={materialChangeOpen} setOpen={closeChangeModalClose} materialInfo={material}/>
                </>)}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MaterialManage