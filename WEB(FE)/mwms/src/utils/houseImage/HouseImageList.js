import React, { useCallback, useEffect, useState } from 'react'
import { axiosGet, axiosPut } from '../../api';
import { getLSUnitList } from '../../pages/authorPages/UnitSelect';
import { useAuth } from '../../routes/AuthContext';
import HouseImage from './HouseImage'

function HouseImageList() {
  const [imageList, setImageList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [currHouse, setCurrHouse] = useState(0);

  const auth = useAuth();
  const currUnit = auth.unitSelected;

  const fetchImgList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
      //사진에 관한 정보
      let newImgList = [];
      data.map((da) => {
        let newDa = {};
        newDa.id = da.id;
        newDa.name = da.name;
        //사진에 관한 정보 추가
        newDa.img = da.img;
        newImgList.push(newDa);
      });
      setImageList(newImgList);
      setHouseList(data);
    } catch (error) {
      alert("Error on fetching unit");
    }
  }, []);

  useEffect(() => {
    //fetchImgList();
  }, []);

  useEffect(() => {
    //imageList 중 index 가 currhouse 인 id 를 가진 house의 img 를 변경하는 로직을 작성해주기 
    //fetchImg();
  }, [imageList]);

  const fetchImg = async () => {
    let copyOne = imageList[currHouse];
    await axiosPut("/", copyOne);
  }

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
          {imageList[currHouse]}
          {(currHouse < houseList.length - 1) && (<button onClick={onRight}>{'->'}</button>)}
        </p>
      </div>
      <HouseImage imageList={imageList} setImageList={setImageList} currHouse={currHouse} />
    </div>
  )
}

export default HouseImageList