import React from 'react';
import { useState } from 'react';

function HoverButton({buttonName, key, onClick}) {
  const [hovering, setHovering] = useState(false);
  
  const chaneName = () => {
    
  }

  return (
    <div key={key} onClick={onClick}>
      <div className="hover-btn" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <span className="text">{buttonName}</span>
        {hovering &&<div className="hover-inner"> 부대명수정 </div>}
      </div>
    </div >
  )
}

export default HoverButton