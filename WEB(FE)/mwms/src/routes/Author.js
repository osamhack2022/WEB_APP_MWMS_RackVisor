import React, { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import UnitSelect from '../pages/authorPages/UnitSelect';
import LogoutPage from '../pages/authorPages/LogoutPage';
import HouseSelect from '../pages/authorPages/HouseSelect';
import MaterialManage from '../pages/authorPages/MaterialManage';
import AuthorMainPage from '../pages/authorPages/AuthorMainPage';
import BarcodeManage from '../pages/authorPages/BarcodeManage';
import HistoryFind from '../pages/authorPages/HistoryFind';
import HouseManage from '../pages/authorPages/HouseManage';
import StaticsPage from '../pages/authorPages/StaticsPage';
import CostPage from '../pages/authorPages/CostPage';
import { ProvideAuth } from './AuthContext';

export const AuthorContext = createContext({
  unitSelected : "",
  setUnitSelected : () => {},
  houseSelected : "",
  setHouseSelected : () => {},
  houseList: [],
  setHouseList: () => {}, 
});

function Author() {

  return (
    <div>
      <ProvideAuth>
        <Routes>
          <Route path = "/" element = {<UnitSelect/>} />

          <Route path = '/main' element = {<AuthorMainPage/>}/>
          <Route path = "/materialManage" element = {<MaterialManage/>}/>
          
          <Route path = "/houseSelect" element = {<HouseSelect/>}/>
          <Route path = "/houseManage" element = {<HouseManage/>}/>

          <Route path = "/barcode" element = {<BarcodeManage/>}/>
          <Route path = "/history" element = {<HistoryFind/>}/>
          <Route path = "/static" element = {<StaticsPage/>}/>

          <Route path = "/logout" element = {<LogoutPage/>}/>
          <Route path = "/cost" element = {<CostPage/>}/>

          <Route path = "*" element = {<UnitSelect />}/>
        </Routes>
      </ProvideAuth>
    </div>
  )
}

export default Author