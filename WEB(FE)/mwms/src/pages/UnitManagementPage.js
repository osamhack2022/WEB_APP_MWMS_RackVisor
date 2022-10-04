import React from 'react'
import logoutButtonList from '../utils/logoutButtonList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddRemoveLayout from '../utils/UnitGrid';

function UnitManagementPage() {
  return (
    <div>
      <body>
        <Header buttonList={logoutButtonList}/>
        <div>
          UnitManagementPage
        </div>
        <AddRemoveLayout/>
        <Footer/>
      </body>
    </div>
  )
}


export default UnitManagementPage