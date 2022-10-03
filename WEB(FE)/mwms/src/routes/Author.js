import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UnitManagementPage from '../pages/UnitManagementPage';
import Header from '../components/Header';

function Author() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<UnitManagementPage/>}/>
        <Route path = "/header" element = {<Header/>}/>
        <Route path = "*" element = {<UnitManagementPage />}/>
      </Routes>
    </div>
  )
}

export default Author