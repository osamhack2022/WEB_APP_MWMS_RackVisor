import React from 'react'
import {Routes, Route} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ServiceIntroducePage from '../pages/ServiceIntroducePage';

function NotAuthor() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/introduction" element={<ServiceIntroducePage/>}/>
        <Route path="*" element={<MainPage/>}/>
      </Routes>
    </div>
  )
}

export default NotAuthor