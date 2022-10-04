import React from 'react'
import logoutButtonList from '../utils/logoutButtonList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NoCollisionLayout from '../utils/UnitGrid';

function UnitManagementPage() {
  return (
    <div>
      <body>
        <Header buttonList={logoutButtonList}/>
        <div>
          UnitManagementPage
        </div>
        <NoCollisionLayout/>
        <Footer/>
      </body>
    </div>
  )
}


export default UnitManagementPage