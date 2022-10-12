import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import { getLSUnitList } from './UnitSelect'

function HouseSelect() {
  
  let auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.unitSelected === "") {
      alert("부대를 선택해주세요");
      navigate("/");
    }
  }, []);


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
  
  // houseList 예시: [{name : "1종창고", gridLayout: []}, {name : "2종창고", gridLayout: []}, {name : "3종창고", gridLayout: []}] <- DB 설계에 따라 형식 바뀔 수 있음
  const [houseList, setHouseList] = useState(hl);
  

  const onSelectHouse = (e) => {
    // BUG: 가끔가다가 창고 이름 안 뜰 경우 있는 버그 있음!
    auth.houseSelect(e.target.id);
    navigate("/houseManage");
  }

  const addHouse = () => {
    const newName = prompt("창고명을 입력해주세요");
    if(newNmae === null)
    {
      return;
    }
    let lsUnitList = getLSUnitList();
    let lsUnit = lsUnitList.find( (e) => (e.name === unitName)); 
    let lsHouseList = lsUnit.houseList;
    lsHouseList.push({
      name: newName,
      gridLayout: [],
    });
    localStorage.setItem("unitList", JSON.stringify(lsUnitList));
    setHouseList(lsHouseList);
  }
  
  useEffect(() => {
    auth.houseSelect("");
  }, []);
  
  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <div> 창고 관리 </div>
          <div class="grid grid-cols-4 gap-4 px-4 py-3 border-gray-200 bg-gray">
            {houseList.map((h) => (
              <div id={h.name} onClick={onSelectHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <span class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{h.name}</span>
              </div> 
            ))}
            <div onClick={addHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <span class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+ 창고 추가</span>
            </div> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HouseSelect