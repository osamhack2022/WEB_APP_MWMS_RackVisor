import React, { useEffect, useState } from 'react'

function Tsg({key, style, word }) {
  const [ho, setH] = useState(0);

  return (
    <div
      key = {key}
      style = {style}
      onMouseOver={() => setH(1)}
      onMouseOut={() => setH(0)}
    >
      {word}
      {ho ? (<div>haha</div>) : ("")}
    </div>
  )
}

export default Tsg