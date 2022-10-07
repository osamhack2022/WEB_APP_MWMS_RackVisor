import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import loginButtonList from '../../utils/loginButtonList'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/SearchInput'

function HouseSelect() {
  const [houseList, setHouseList] = useState([{name : "1종창고"}, {name : "2종창고"}, {name : "3종창고"}]);
  let auth = useAuth();
  const navigate = useNavigate();

  const onSelectHouse = (e) => {
    auth.houseSelect(e.target.id);
    navigate("/houseManage");
  }

  const addHouse = () => {
    const newName = prompt("창고명을 입력해주세요"); 
    setHouseList((houseList) => 
      houseList.concat({name : newName})
    );
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
          <div class="grid grid-cols-4 gap-4">
            {houseList.map((hn) => (
              <div class = "border" id={hn.name} onClick={onSelectHouse}>{hn.name}</div>
            ))}
            <div class = "border" onClick={addHouse}>+ 창고 추가</div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HouseSelect