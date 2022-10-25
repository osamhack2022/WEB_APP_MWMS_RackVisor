import React from 'react'
import {Routes, Route} from 'react-router-dom';
import MainPage from '../pages/notAuthorPages/MainPage';
import LoginPage from '../pages/notAuthorPages/LoginPage';
import ServiceIntroducePage from '../pages/notAuthorPages/ServiceIntroducePage';
import SignupPage from '../pages/notAuthorPages/SignupPage';

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