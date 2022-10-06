import React, { useState } from 'react'
import UnitgridEle from './UnitgridEle';

function Unitgrid() {
  const [unitList, setUnitList] = useState(getItem("unit"));
  
  const removeUnit = (e) => {
    const answer = window.confirm("삭제하시겠습니까?");
    if (answer) {
      //삭제하기
      
    }
  }

  const changeName = (e) => {
    const changeName = window.prompt("부대명 변경");

  }

  const addUnit = (e) => {
    const name = window.prompt("부대명 기입");
    
  }

  return (
    <div>
      {unitList.map((un) => (
        <div key={un.name}>
          <span class = "border">{un.name}</span>
          <button class = "border" onClick={removeUnit} key={un.name}>X</button>
          <button class = "border" onClick={changeName} key={un.name}>부대명 수정하기</button>
          <UnitgridEle key={un.name}/>
        </div>
      ))}
    </div>
  )
}

export default Unitgrid


const getItem = (id) => {
  const tmpItem = JSON.parse(global.localStorage.getItem(id)) || {}
  return JSON.parse(JSON.stringify(tmpItem));
}

const setItem = (id, value) => {
  global.localStorage.setItme(id, JSON.stringify({
    [id]: value
  }));
}