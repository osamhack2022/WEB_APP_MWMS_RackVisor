import React, { useContext, useEffect, useState } from 'react'
import logoutButtonList from '../../utils/logoutButtonList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../routes/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthorHeader from '../../components/AuthorHeader';
import Sidebar from '../../components/Sidebar';

function UnitSelect() {
  const navigate = useNavigate();
  const [unitList, setUnitList] = useState([{name : "123부대"}, {name : "345부대"}, {name : "678부대"}]);
  //11번째 줄에서 서버에서 unit의 리스트를 받아오면 된다
  let auth = useAuth();

  const onSelectUnit = (e) => {
    auth.unitSelect(e.target.id);
    navigate("/main");
  }

  const addUnit = () => {
    const newName = prompt("부대명을 입력해주세요"); //부대명이 서로 달라야 함
    setUnitList((unitList) => 
      unitList.concat({name : newName})
    );
  }

  useEffect(() => {
    auth.unitSelect("");
  }, []);

  return (
    <div>
      <body>
        <AuthorHeader />

        <div> 부대 관리 </div>
        <div class="grid grid-cols-4 gap-4">
          {unitList.map((un) => (
            <div class = "border" id={un.name} onClick={onSelectUnit}>{un.name}</div>
          ))}
          <div class = "border" onClick={addUnit}>+ 부대 추가</div>
        </div>
        
        <Footer/>
      </body>
    </div>
  )
}

export default UnitSelect