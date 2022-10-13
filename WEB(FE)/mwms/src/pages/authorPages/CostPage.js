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
          <button onClick={handleTest}>열기</button>
          {forTest && <SelectBox class ="overflow-auto" onClose={() => setTest(false)}/>}
        </div>
      </div>
      <Footer/>
    </div>
    )
}

export default CostPage