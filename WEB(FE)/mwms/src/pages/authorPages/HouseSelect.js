import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'

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
          <div class="grid grid-cols-4 gap-4 px-4 py-3 border-gray-200 bg-gray">
            {houseList.map((hn) => (
              <div  id={hn.name} onClick={onSelectHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{hn.name}</h5>
              </div> 
            ))}
            <div onClick={addHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+ 창고 추가</h5>
            </div> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HouseSelect