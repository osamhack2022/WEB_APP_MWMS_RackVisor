import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UnitManagementPage from '../pages/UnitManagementPage';
import Header from '../components/Header';
import LogoutPage from '../pages/LogoutPage';

function Author() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<UnitManagementPage/>}/>
        <Route path = "/header" element = {<Header/>}/>
        <Route path = "/logout" element = {<LogoutPage/>}/>
        <Route path = "*" element = {<UnitManagementPage />}/>
      </Routes>
    </div>
  )
}

export default Author