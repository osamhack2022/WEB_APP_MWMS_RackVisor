import React, { useState } from 'react'
import logoutButtonList from '../../utils/logoutButtonList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AddRemoveLayout from '../../utils/grid/UnitGrid';
import SideScroll from '../../utils/sidescroll/SideScroll'; 
import CreateList from '../../utils/cabinet/Cabinet';
import SelectBox from '../../utils/modal/SelectBox';

function UnitSelect() {
  const [modal, setModal] = useState("visible");

  return (
    <div>
      <body>
        <Header buttonList={logoutButtonList}/>
        <div>
        UnitSelect
        </div>
        <button onClick={setModal}>모달</button>
        <AddRemoveLayout />
        <SelectBox setModalShow={setModal} visible={modal}/>
        <Footer/>
      </body>
    </div>
  )
}


export default UnitSelect