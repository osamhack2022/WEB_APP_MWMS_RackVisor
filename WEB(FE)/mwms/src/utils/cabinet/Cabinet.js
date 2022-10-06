import React, { useState } from "react";
import SideScroll from "../sidescroll/SideScroll";

const CreateList = () => {
  const [countList, setCountList] = useState([0])

  const onAddDetailDiv = () => {
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)	// index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
    setCountList(countArr)
    console.log(countArr)
  }

  return (
    <div>
      <button onClick={onAddDetailDiv}>
        추가
      </button>
      {countList.map(() => (
        <SideScroll />
      ))}
    </div>
  )
}
export default CreateList