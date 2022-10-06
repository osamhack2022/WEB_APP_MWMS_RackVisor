import React, { useState } from 'react'

function UnitgridEle({key}) {
  const [hover, setHover] = useState(0);
  const setSelectedUnit = (e) => {
    global.localStorage.setItem("selectedUnit", e.target.key);
  }

  return (
    <div onMouseOver={(e) => setHover(1)} onMouseOut={(e) => setHover(0)}>
      {hover ? (<button key={key} onClick={(e) => setSelectedUnit(e)}>선택</button>): ("")}
    </div>
  )
}

export default UnitgridEle