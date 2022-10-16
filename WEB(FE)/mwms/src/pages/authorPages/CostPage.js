import React, { useState } from 'react'
import SelectBox from '../../utils/modal/SelectBox';
import AuthorHeader from '../../components/AuthorHeader';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';

function CostPage() {
  const [forTest, setTest] = useState(false);
  const handleTest = (e) => {
    setTest(!forTest);
  }
  return (
    <div>
      <AuthorHeader />
      <div className="flex">
        <Sidebar/>
        <div>
          환경설정
        </div>
      </div>
      <Footer/>
    </div>
    )
}

export default CostPage