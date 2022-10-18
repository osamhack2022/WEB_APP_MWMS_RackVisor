import React, { useEffect } from 'react'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import WarehouseGridLayout from '../../utils/grid/Warehouse'

function HouseManage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("부대") === "") {
      alert("부대를 선택해주세요");
      navigate("/");
    }
  }, []);

  const onToHouseSelect = (e) => {
    navigate("/houseSelect");
  }

  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <button class="absolute top-47 right-5 m-2 p-1 content-end border-2 border-slate-500 rounded-md text-xs" onClick={onToHouseSelect}>{"<"}창고선택</button>
          <h1 class="border-b-2 m-1 pl-8 pb-4 font-bold text-2xl">{auth.houseSelected}<br/></h1>
          <div>
          <WarehouseGridLayout unitSelected={localStorage.getItem("부대")} houseSelected={auth.houseSelected}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HouseManage