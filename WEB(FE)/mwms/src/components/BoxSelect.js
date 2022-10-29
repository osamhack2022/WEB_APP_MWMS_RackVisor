import React, { useState, useEffect, useCallback } from 'react'
import WarehouseGridLayout from '../utils/grid/WarehouseMaterial';
import {getLSUnitList} from '../pages/authorPages/UnitSelect'
import { useNavigate } from 'react-router-dom';
import CreateList from '../utils/cabinet/Cabinet';
import { useAuth } from '../routes/AuthContext';
import { axiosGet } from '../api';

function BoxSelect({setBoxSelect, popup, qr, addOne, setBoxString}) {
  const auth = useAuth();
  const [houList, setHouList] = useState([]);
  const [selHouse, setSelHouse] = useState({ id : -1, name : ""});
  const [visual, setVisual] = useState({});
  const [cabSelec, setCabSelec] = useState("");
  const [boxSelec, setBoxSelec] = useState("");
  const currUnit = auth.unitSelected;

  const fetchHouseList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
      let visualJ = {};
      data.map((da) => {
        visualJ[da.name] = false;
      })
      setVisual(visualJ);
      setHouList(data);
    } catch (error) {
      alert("Error on feching house");
    }
  }, []);

  useEffect(() => {
    if(!currUnit) {
      alert("부대를 선택해주세요");
    } else {
      fetchHouseList();
    }
  }, []);

  useEffect(() => {
    if (boxSelec != "") {
      setBoxSelect(boxSelec);
    }
  }, [boxSelec]);

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

  return (
    <div class={"flex-1 gap-2 overflow-x-auto " + (popup ? "" : "")}>
      {cabSelec ? (<>
        <button onClick={() => {
          setCabSelec("");  
          setBoxSelec("")}}
          class={"ml-2 mt-2 " + (popup ? " " : "text-white") }>{'<- '} 뒤로가기</button>
        <CreateList boxSelec={boxSelec} setBoxSelec={setBoxSelec} cabSelec={cabSelec} modify={false} qr={qr ? true : false}/>
        </>)
      : (<div class="my-6">
        <span class={"m-2 p-2 font-bold text-lg" + (popup ? "" : " text-white")}>위치 기반 물자 관리</span> <br/> 
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
          visual[hou.name] && <WarehouseGridLayout unitSelected={currUnit} houseSelected={selHouse} setClick={testClick} popup={popup} addOne={addOne}/>
        ))}
      </div>)
      }
      </div>
  )
}

export default BoxSelect