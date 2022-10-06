import React, {useState} from 'react'

function UnitGridItem({i, el}) {
  const [hover, setHover] = useState(0);
  const onClickSetUnit = (e) => {
    localStorage.setItem("unit", e.target.key);
    window.location.href = "/next";
  }

  return (
    <div key={i} 
      data-grid={el} 
      onMouseOver={() => setHover(1)} 
      onMouseOut={() => setHover(0)}>
      <span className="text">{i}</span>
      {hover ? (<button onClick={onClickSetUnit} key={i}>선택</button>) : ("")}
    </div>
  )
}

export default UnitGridItem