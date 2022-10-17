import React, { useState, useEffect } from 'react'
import WarehouseGridLayout from '../utils/grid/WarehouseMaterial';
import {getLSUnitList} from '../pages/authorPages/UnitSelect'
import { useNavigate } from 'react-router-dom';
import CreateList from '../utils/cabinet/Cabinet';

function BoxSelect({setBoxSelect}) {
  const navigate = useNavigate();
  const [selHouse, setSelHouse] = useState("");
  const [visual, setVisual] = useState({});
  const [houList, setHouList] = useState([]);
  const [cabSelec, setCabSelec] = useState("");
  const [boxSelec, setBoxSelec] = useState("");
  const [grid, setGrid] = useState([]);
  const [itm, setItm] = useState([]);

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
            <option value={hou.name} key={hou.name}>
              {hou.name}
            </option>
          ))}
        </select>
        {houList.map((hou) => (
          visual[hou.name] && <WarehouseGridLayout unitSelected={localStorage.getItem("부대")} houseSelected={hou.name} setClick={testClick}/>
        ))}
      </>)}
    </>
  )
}

export default BoxSelect