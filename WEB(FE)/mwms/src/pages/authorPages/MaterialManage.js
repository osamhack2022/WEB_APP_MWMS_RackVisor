  import React, { useCallback, useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput'
import WarehouseGridLayout from '../../utils/grid/WarehouseMaterial'
import CreateList from '../../utils/cabinet/Cabinet'
import ExcelModal from '../../utils/modal/ExcelModal'
import ManageList from '../../components/ManageList'
import MaterialManageModal from '../../utils/modal/MaterialManageModal'
import MaterialChangeModal from '../../utils/modal/MaterialChangeModal'
import Tabs from '../../components/Tabs'
import { axiosGet } from '../../api'


function MaterialManage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [houList, setHouList] = useState([]);
  const [selHouse, setSelHouse] = useState({ id : -1, name : ""});
  const [visual, setVisual] = useState({});
  const [cabSelec, setCabSelec] = useState("");
  const [boxSelec, setBoxSelec] = useState("");
  const [open, setOpen] = useState(false);
  const valList = ['name', 'type', 'specipicType', 'amount', 'comment', 'expirationDate']
  const korList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const [ data, setData] = useState([])
  const [material, setMaterial] = useState({id : -1, name : " ", type : "없음", specipicType : "없음", amount : " ", comment : " ", expirationDate : "2222-10-10"});
  const [openPlus, setOpenPlus] = useState(false);
  const [materialChangeOpen, setMaterialChangeModal] = useState(false);
  const [loc, setLoc] = useState({});
  const [tabType, setTabType] = useState("material");
  const currUnit = auth.unitSelected;

  const fetchHouseList = useCallback(async () => {
    try {
      const currData = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
      let visualJ = {};
      currData.map((da) => {
        visualJ[da.name] = false;
      })
      setVisual(visualJ);
      setHouList(currData);
    } catch (error) {
      alert("Error on feching house");
    }
  }, []);

  const fetchData = useCallback(async (num) => {
    try {
      const response = await axiosGet("/stocks/stocks-in-box/" + (num).toString());
      console.log("RESPONSE : " + JSON.stringify(response));
      if (response) {
        response.map((re) => {
          if (re.expirationDate) {
            re.expirationDate = (re.expirationDate).substr(0, 10);
          }
          if (re.type) {
            re.type = re.type.substr(5) == "NULL" ? "없음" : re.type.substr(5) + "종";
          }    
        });

        setData(response);
      }
    } catch (error) {
      alert("rack 별 물품의 리스트를 받아오던 도중 오류가 발생했습니다");
    }
  }, []);

  useEffect(() => {
    if(!currUnit) {
      alert("부대를 선택해주세요");
      navigate("/");
    } else {
      fetchHouseList();
    }
  }, []);

  useEffect(() => {
    if (boxSelec.toString() != "" && currUnit) {
      console.log("boxNum : " + JSON.stringify(boxSelec));
      fetchData(boxSelec);
    }
  }, [boxSelec])

  const onSelHouse = (e) => {
    setSelHouse(houList.find((hou) => (hou.name == e.currentTarget.value)));
    auth.houseSelect(houList.find((hou) => (hou.name == e.currentTarget.value)));
    let viCopy = visual;
    viCopy[selHouse.name] = false;
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
    setMaterial({id : -1, name : " ", type : "없음", specipicType : "없음", amount : " ", comment : " ", expirationDate : "2222-10-10"});
  }

  const defaultTabs = [
    { name: '이름 기반 탐색', value: 'material', current: true },
    { name: '위치 기반 탐색', value: 'box', current: false },
  ]

  useEffect(() => {
    setData([]);
  }, [tabType]);

  return (
    <div class="bg-[#202020]">
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1 bg-[#202020]">
        <div class="sm:flex hidden border-b-2 border-[#706F6F] mb-2 mr-10 ml-6 pb-2 font-bold text-2xl text-white mt-5">물자 관리</div>

          <div class="flex grid grid-cols-2 divide-x-2 gap-4 px-4 py-3 border-gray-200 bg-gray">
            <div class="flex-1">
              <div class="flex mb-4">
                <button class="-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-[#7A5EA6] hover:bg-[#9d79d4] text-white text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setOpen(true)}>excel로 업로드</button>
                <ExcelModal open={open} setOpen={setOpen}/>
                <button class="-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-[#7A5EA6] hover:bg-[#9d79d4] text-white text-base font-medium  sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setOpenPlus(true)}>물자 추가 +</button>
                <MaterialManageModal open={openPlus} setOpen={setOpenPlus} />
              </div>
              <Tabs defaultTabs={defaultTabs} setTabType={setTabType}/>
              <div class="bg-[#323232] rounded-2xl ">
                {tabType == "material" && <><SearchInput setData={ setData }/></>}
                {/* {boxSelec ? ( <> {tabType == "box" && <div>창고 : {selHouse.id} - 선반 : {cabSelec} -  박스 : {boxSelec}</div>} </> ) : ("")} */}
                {tabType == "box" && 
                  <div class="flex-1 gap-2 overflow-x-auto">
                    {cabSelec ? (<>
                      <button onClick={() => {
                        setCabSelec("");
                        setBoxSelec("")}}
                        class="text-white ml-2 mt-2">{'<-'}뒤로가기</button>
                      <CreateList boxSelec={boxSelec} setBoxSelec={setBoxSelec} cabSelec={cabSelec} modify={true}/>
                      <br class="m-3"/>
                      </>)
                    : (<div class="my-6">
                      <span class="m-2 p-2 font-bold text-white text-lg">위치 기반 물자 관리</span> <br/> 
                      <select class="bg-gray-700 text-white mx-6 my-4" onChange={onSelHouse} value={selHouse.name}>
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
                        visual[hou.name] && <WarehouseGridLayout unitSelected={currUnit} houseSelected={selHouse} setClick={testClick} popup={false}/>
                      ))}
                    </div>)
                    }
                  </div>
                }
              </div>
            </div>
            { (tabType == "box" || tabType == "material") && 
                (<div class="pt-3">
                  <ManageList korList={korList} defaultList={valList} data={data} setSelect={materialHandle}/>
                  <MaterialChangeModal open={materialChangeOpen} setOpen={closeChangeModalClose} materialInfo={material}/>
                </div>)}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default MaterialManage