import React, { useEffect, useState } from 'react'
import { getLSUnitList } from '../../pages/authorPages/UnitSelect';
import HouseImage from './HouseImage'


function HouseImageList() {
  const [imageList, setImageList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [currHouse, setCurrHouse] = useState(0);

  useEffect(() => {
    let unitName = localStorage.getItem("부대");
    let lsUnitList=  getLSUnitList();
    let lsUnit = lsUnitList.find( (e) => (e.name === unitName) );
    let hl;
    if(lsUnit === undefined)
    {
      hl = []
    }
    else
    {
      hl = lsUnit.houseList;
    }

    let nameList = [];
    let imgList = [];

    hl.map((house) => {
      nameList.push(house.name);
      imgList.push("");
    });

    setHouseList(nameList);
    setImageList(imgList);
  }, []);

  const onLeft = () => {
    setCurrHouse(currHouse > 0 ? currHouse - 1 : currHouse)
  }

  const onRight = () => {
    setCurrHouse(currHouse < houseList.length - 1 ? currHouse + 1 : currHouse)
  }

  return (
    <div class="text-center">
      <div class="flex-auto text-center">
        <p class="flex text-center">
          {(currHouse > 0) && (<button onClick={onLeft}>{'<-'}</button>)}
          {houseList[currHouse]}
          {(currHouse < houseList.length - 1) && (<button onClick={onRight}>{'->'}</button>)}
        </p>
      </div>
      <HouseImage imageList={imageList} setImageList={setImageList} currHouse={currHouse} />
    </div>
  )
}

export default HouseImageList