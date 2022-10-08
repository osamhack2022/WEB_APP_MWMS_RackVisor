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
import ScaledLayout from '../../utils/grid/Warehouse'

function HouseManage() {
  const auth = useAuth();
  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
        <h1 class="border-b-2 m-1 pl-8 pb-4 font-bold text-2xl">test {auth.houseSelected}<br/></h1>
          <ScaledLayout></ScaledLayout>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HouseManage