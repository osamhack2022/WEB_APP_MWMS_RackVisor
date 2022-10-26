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
import Title from '../../utils/with_description'

function HouseSelect() {
  let auth = useAuth();
  const currUnit = auth.unitSelected;
  const unitName = currUnit.name;
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState([{id: 1, name: "이름",}]);

  const fetchHouseList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());

      setHouseList(data);
    } catch (error) {
      alert("Error on feching house");
    }
  }, []);

  useEffect(() => {
    auth.houseSelect({});
    console.log(JSON.stringify(currUnit));
    if(!currUnit) {
      alert("부대를 선택해주세요");
      navigate("/");
    } else {
      fetchHouseList();
    }
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
    if(newName === null) {
      return;
    }

    // ? Add Unit
    let itemToAdd = {
      name: newName,
      comment: newName,
      storedUnitId: Number(currUnit.id),
    };

    //TODO _ api
    const itemResponse = await axiosPost("/warehouses", itemToAdd);
    itemToAdd.id = itemResponse.id;

    setHouseList((prev) => [...prev, itemToAdd]);
  }
  
  return (
    <div class="bg-[#202020] w-full">
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <div class="sm:flex hidden border-b-2 border-[#706F6F] mb-7 mx-16 pb-6 font-bold text-2xl text-white mt-5">창고 선택</div>
          <div class="grid grid-cols-4 gap-4 px-4 py-3 border-gray-200 bg-gray mx-16">
            {houseList.map((h) => (
              <button id={h.id} onClick={onSelectHouse} class="hover:border-[#7A5EA6] hover:bg-[#7A5EA6] hover:text-white py-4 px-6 font-poppins font-bold text-[24px] text-primary-900 bg-[#706F6F] rounded-[10px]">
                <div id = {h.id} onClick={onSelectHouse} >{h.name}</div>
              </button> 
            ))}
            <button onClick={addHouse} class="hover:border-[#7A5EA6] hover:bg-[#7A5EA6] hover:text-white py-4 px-6 font-poppins font-bold text-[24px] text-primary-900 bg-[#706F6F] rounded-[10px]">
                <span >+ 창고 추가</span>
            </button> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HouseSelect