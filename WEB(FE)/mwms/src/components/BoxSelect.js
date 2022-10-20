import React, { useState, useEffect, useCallback } from 'react'
import WarehouseGridLayout from '../utils/grid/WarehouseMaterial';
import {getLSUnitList} from '../pages/authorPages/UnitSelect'
import { useNavigate } from 'react-router-dom';
import CreateList from '../utils/cabinet/Cabinet';
import { useAuth } from '../routes/AuthContext';
import { axiosGet } from '../api';

function BoxSelect({setBoxSelect}) {
  const navigate = useNavigate();
  const [selHouse, setSelHouse] = useState("");
  const [visual, setVisual] = useState({});
  const [houList, setHouList] = useState([]);
  const [cabSelec, setCabSelec] = useState("");
  const [boxSelec, setBoxSelec] = useState("");
  const auth = useAuth();
  const currUnit = auth.unitSelected;
  const currHouse = auth.houseSelected;


  const fetchHouseList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouse/my-warehouses/" + (currUnit.id).toString());
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
      alert("부대를 선택해주세요");
      navigate("/");
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

  useEffect(() => {
    let newLocation = selHouse.toString() + " " +  cabSelec.toString() + " " + boxSelec.toString();
    setBoxSelect({위치 : newLocation});
  }, [boxSelec]);

  return (
    <>
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
            <option value={hou.id} key={hou.name}>
              {hou.name}
            </option>
          ))}
        </select>
        {houList.map((hou) => (
          visual[hou.id] && <WarehouseGridLayout unitSelected={currUnit} houseSelected={selHouse} setClick={testClick}/>
        ))}
      </>)}
    </>
  )
}

export default BoxSelect