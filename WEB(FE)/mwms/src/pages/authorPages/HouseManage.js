import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import ScaledLayout from '../../utils/grid/Warehouse'

function HouseManage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onToHouseSelect = (e) =>
  {
    navigate("/houseSelect");
  }

  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <button class="absolute right-2 top-20 m-2 p-1 content-end border-2 border-slate-500 rounded-md text-xs" onClick={onToHouseSelect}>{"<"}창고선택</button>
          <h1 class="border-b-2 m-1 pl-8 pb-4 font-bold text-2xl">{auth.houseSelected}<br/></h1>
          <ScaledLayout/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HouseManage