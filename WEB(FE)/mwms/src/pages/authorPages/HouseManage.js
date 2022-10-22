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
  const currUnit = auth.unitSelected;
  const currHouse = auth.houseSelected;

  useEffect(() => {
    if(!currUnit) {
      alert("부대를 선택해주세요");
      navigate("/");
    } else if (!currHouse) {
      alert("창고를 선택해주세요");
      navigate("/houseSelect");
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
          <h1 class="border-b-2 m-1 pl-8 pb-4 font-bold text-2xl">{currHouse.name}<br/></h1>
          <div>
            <WarehouseGridLayout unitSelected={currUnit} houseSelected={currHouse}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HouseManage