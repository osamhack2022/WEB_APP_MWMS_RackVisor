import React from 'react'
import logoutButtonList from '../utils/logoutButtonList';
import Header from '../components/Header';
import Footer from '../components/Footer';

function UnitManagementPage() {
  const logout = () => {
    localStorage.setItem("token", "");
    window.location.replace("/");
  }
  return (
    <div>
      <body>
        <Header buttonList={logoutButtonList}/>
        <div>
          UnitManagementPage
          <button onClick={logout}>로그아웃</button>
        </div>
        <Footer/>
      </body>
    </div>
  )
}

export default UnitManagementPage