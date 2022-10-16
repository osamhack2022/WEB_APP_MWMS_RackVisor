import React, { useEffect, useState } from 'react'
import HouseImage from './HouseImage'

function HouseImageList() {
  const [imageList, setImageList] = useState(['', '', '']);
  const [houseList, setHouseList] = useState(['1종 창고', '2종 창고', '3종 창고']);
  const [currHouse, setCurrHouse] = useState(0);

  const onLeft = () => {
    setCurrHouse(currHouse > 0 ? currHouse - 1 : currHouse)
  }

  const onRight = () => {
    setCurrHouse(currHouse < houseList.length - 1 ? currHouse + 1 : currHouse)
  }

  return (
    <div>
      <div class="flex">
        {(currHouse > 0) && (<div onClick={onLeft}>{'<-'}</div>)}
        {houseList[currHouse]}
        {(currHouse < houseList.length - 1) && (<div onClick={onRight}>{'->'}</div>)}
      </div>
      <HouseImage imageList={imageList} setImageList={setImageList} currHouse={currHouse} />
    </div>
  )
}

export default HouseImageList