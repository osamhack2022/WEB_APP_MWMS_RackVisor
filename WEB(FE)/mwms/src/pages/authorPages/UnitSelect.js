import React, { useState } from 'react'
import logoutButtonList from '../../utils/logoutButtonList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function UnitSelect({onUnitSelect}) {
  const [unitList, setUnitList] = useState([{name : "123부대"}, {name : "345부대"}, {name : "678부대"}]);
  //11번째 줄에서 서버에서 unit의 리스트를 받아오면 된다
  
  const onSelectUnit = (e) => {
    onUnitSelect(e.target.key);
    window.location.replace("/main");
  }

  const addUnit = () => {
    const newName = prompt("부대명을 입력해주세요"); //부대명이 서로 달라야 함
    setUnitList((unitList) => 
      unitList.concat({name : newName})
    );
  }

  return (
    <div>
      <body>
        <Header buttonList={logoutButtonList} isLogin={true}/>
        <div> 부대 관리 </div>
        <div class="grid grid-cols-4 gap-4">
          {unitList.map((un) => (
            <div class = "border" key={un.name} onClick={onSelectUnit}>{un.name}</div>
          ))}
          <div class = "border" onClick={addUnit}>+ 부대 추가</div>
        </div>
        <Footer/>
      </body>
    </div>
  )
}

export default UnitSelect