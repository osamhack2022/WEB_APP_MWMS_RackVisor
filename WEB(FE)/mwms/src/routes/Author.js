import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import UnitSelect from '../pages/authorPages/UnitSelect';
import LogoutPage from '../pages/authorPages/LogoutPage';
import HouseSelect from '../pages/authorPages/HouseSelect';
import MaterialManage from '../pages/authorPages/MaterialManage';


function Author() {
  const [unitSelected, setUnitSelected] = useState();
  const [houseSelected, setHouseSelected] = useState();

  return (
    <div>
      <Routes>
        <Route path = "/" element = {<UnitSelect/>}/>
        <Route path = "/houseSelect" element = {<HouseSelect/>}/>
        <Route path = "/houseManage" element = {<MaterialManage/>}/>


        <Route path = "/logout" element = {<LogoutPage/>}/>
        <Route path = "*" element = {<UnitSelect />}/>
      </Routes>
    </div>
  )
}

export default Author