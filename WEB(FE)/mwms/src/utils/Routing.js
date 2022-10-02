import React from 'react';
import { Route, Navigate, Routes } from "react-router-dom";
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import ServiceIntroducePage from '../pages/ServiceIntroducePage';
import SignupPage from '../pages/SignupPage';
import UnitManagementPage from '../pages/UnitManagementPage';

const isLogin = () => !!localStorage.getItem("token");

function Routing() {
  return (
    <div>
      {isLogin() ? <Navigate to = "/unitmanage"/> : null }
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/introduce" element={<ServiceIntroducePage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/unitmanage" element={<UnitManagementPage/>}/>
      </Routes>
    </div>
  )
}

export default Routing