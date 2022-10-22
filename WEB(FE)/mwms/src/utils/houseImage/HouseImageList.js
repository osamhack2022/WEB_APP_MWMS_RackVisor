import React, { useCallback, useEffect, useState } from 'react'
import { axiosGet, axiosPut } from '../../api';
import { useAuth } from '../../routes/AuthContext';

function HouseImageList() {
  const [imageList, setImageList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [currHouse, setCurrHouse] = useState(0);
  const [imageSrc, setImageSrc] = useState({id : 0, name : "", img : ""});
  const [fileInput, setFileInput] = useState([]);
  const auth = useAuth();
  const currUnit = auth.unitSelected;

  const fetchImgList = useCallback(async () => {
    try {
      const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
      let newImgList = [];
      data.map((da) => {
        let newDa = {}; 
        newDa.id = da.id;
        newDa.name = da.name;
        newDa.img = da.imgBase64 ? da.imgBase64 : "";
        newImgList.push(newDa);
      });
      console.log("홖인 : " + JSON.stringify(newImgList));
      setImageList(newImgList);
      if (newImgList) {
        setImageSrc(newImgList[0]);
      }
      console.log(JSON.stringify(newImgList));
      setHouseList(data);
    } catch (error) {
      alert("Error on fetching unit");
    }
  }, []);

  useEffect(() => {
    fetchImgList();
  }, []);

  useEffect(() => {
    //imageList 중 index 가 currhouse 인 id 를 가진 house의 img 를 변경하는 로직을 작성해주기 
    fetchImg();
  }, [imageSrc, imageList]);

  const fetchImg = async () => {
    if (imageSrc.img != "") {
      let copyOne = imageList[currHouse];
      let itemToAdd = {
        imgBase64 : copyOne.img
      }
      console.log("chg : " + JSON.stringify(copyOne));
      await axiosPut("/warehouses/house-image/" + (copyOne.id).toString(), itemToAdd);
      const response = await axiosGet("/warehouses/" + (copyOne.id).toString())
      alert("이미지 업로드 완료" + JSON.stringify(response));
    }
  }

  const onLeft = () => {
    setCurrHouse(currHouse > 0 ? currHouse - 1 : currHouse)
  }

  const onRight = () => {
    setCurrHouse(currHouse < houseList.length - 1 ? currHouse + 1 : currHouse)
  }

  useEffect(() => {
    if (imageList != []) {
      setImageSrc(imageList[currHouse]);
    }
    setFileInput([]);
    console.log("여기 " + JSON.stringify(imageList[currHouse]));
  }, [currHouse]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        let cpy = imageSrc;
        cpy.img = reader.result;
        setImageSrc(cpy);
        let copyArray = [...imageList];
        copyArray[currHouse].img = reader.result;
        setImageList(copyArray);
        resolve();
      };
    });
  };

  return (
    <div class="text-center">
      <div class="flex justify-center">
        <p class="flex text-center text-white">
          {(currHouse > 0) && (<button onClick={onLeft}>{'<-'}</button>)}
          {imageSrc && imageSrc.name}
          {(currHouse < houseList.length - 1) && (<button onClick={onRight}>{'->'}</button>)}
        </p>
      </div>
      {   
      <main className="container px-3">
        <div className="preview flex justify-center">
          {imageSrc && imageSrc.img != "" && <img src={imageSrc.img} alt="preview-img" />}
        </div>
        <input type="file" onChange={(e) => {
          setFileInput(e.target.files[0]);
          encodeFileToBase64(e.target.files[0]);
        }} files={fileInput} />
      </main>}
    </div>
  )
}

export default HouseImageList