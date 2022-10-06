import React, { useState } from 'react'
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

function Author() {
  const [unitSelected, setUnitSelected] = useState("");
  const [houseSelected, setHouseSelected] = useState("");

  return (
    <div>
      <Routes>
        <Route path = "/" element = {<UnitSelect onUnitSelect={setUnitSelected}/>} />
        
        <Route path = '/main' element = {<AuthorMainPage/>} unit={unitSelected}/>
        <Route path = "/materialManage" element = {<MaterialManage/>}/>
        
        <Route path = "/houseSelect" element = {<HouseSelect onHouseSelect={setHouseSelected} unit={unitSelected}/>}/>
        <Route path = "/houseManage" element = {<HouseManage  unit={unitSelected} house={houseSelected}/>}/>

        <Route path = "/barcode" element = {<BarcodeManage house={houseSelected} unit={unitSelected}/>}/>
        <Route path = "/history" element = {<HistoryFind unit={unitSelected}/>}/>
        <Route path = "/static" element = {<HistoryFind unit={unitSelected}/>}/>

        <Route path = "/logout" element = {<LogoutPage/>}/>
        <Route path = "*" element = {<UnitSelect />}/>
      </Routes>
    </div>
  )
}

export default Author