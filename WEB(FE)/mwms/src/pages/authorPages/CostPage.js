import React, { useState } from 'react'
import SelectBox from '../../utils/modal/SelectBox';
function CostPage() {
  const [forTest, setTest] = useState(false);
  const handleTest = (e) => {
    setTest(!forTest);
  }
  return (
    <div>CostPage
      <button onClick={handleTest}>열기</button>
      {forTest && <SelectBox class ="overflow-auto" onClose={() => setTest(false)}/>}
    </div>
    )
}

export default CostPage