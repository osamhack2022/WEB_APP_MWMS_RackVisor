import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import { getLSUnitList } from './UnitSelect'
import { axiosGet, axiosPost } from '../../api'

function HouseSelect() {
  let auth = useAuth();
  const currUnit = auth.unitSelected;
  const unitName = currUnit.name;
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState([]);

  const fetchHouseList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouse/my-warehouses/" + (currUnit.id).toString());
      setHouseList(data);
    } catch (error) {
      alert("Error on feching house");
    }
  }, []);

  useEffect(() => {
    auth.houseSelect({});

    if(!currUnit) {
      alert("부대를 선택해주세요");
      navigate("/");
    }
    //TODO _ api
    // fetchHouseList();
  }, []);

  // houseList 예시: [{name : "1종창고", gridLayout: [], items: []}, {name : "2종창고", gridLayout: [], items: []}, {name : "3종창고", gridLayout: [], items: []} ] <- DB 설계에 따라 형식 바뀔 수 있음
  const onSelectHouse = (e) => {
    auth.houseSelect(houseList.find((hou) => (hou.id == e.target.id)));
    console.log(houseList.find((hou) => (hou.id == e.target.id)));

    e.stopPropagation();
    navigate("/houseManage");
  }

  const addHouse = async () => {
    const newName = prompt("창고명을 입력해주세요");
    if(newName === null)
    {
      return;
    }

    // ? Add Unit
    let itemToAdd = {
      name: newName,
      comment: newName,
      storedUnitId: currUnit.id,
    };

    //TODO _ api
    // const itemResponse = await axiosPost("/warehouses", itemToAdd);
    // itemToAdd.id = itemResponse.id;
    itemToAdd.id = 1;

    setHouseList((prev) => [...prev, itemToAdd]);
  }
  
  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <div> 창고 관리 </div>
          <div class="grid grid-cols-4 gap-4 px-4 py-3 border-gray-200 bg-gray">
            {houseList.map((h) => (
              <button id={h.id} onClick={onSelectHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div id = {h.id} onClick={onSelectHouse}  class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{h.name}</div>
              </button> 
            ))}
            <button onClick={addHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <span class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+ 창고 추가</span>
            </button> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HouseSelect