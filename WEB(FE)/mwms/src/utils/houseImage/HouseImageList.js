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
    // try {
      const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
      let newImgList = [];

      data.map((da) => {
        let newDa = {}; 
        newDa.id = da.id;
        newDa.name = da.name;
        newDa.img = da.warehouseImageBinary ? (da.warehouseImageBinary.data)  : "";
        newImgList.push(newDa);
      });
      setImageList(newImgList);
      if (newImgList) {
        setImageSrc(newImgList[0]);
        console.log(JSON.stringify(newImgList[0]));
      }
      console.log(JSON.stringify(data));
      setHouseList(data);

    // } catch (error) {
    //   alert("Error on fetching unit");
    // }
  }, []);

  useEffect(() => {
    fetchImgList();
  }, []);

  const fetchImg = async (src) => {
    let copyOne = imageList[currHouse];
    let itemToAdd = {
      imgBase64 : src
    }
    await axiosPut("/warehouses/house-image/" + (copyOne.id).toString(), itemToAdd);
    const response = await axiosGet("/warehouses/" + (copyOne.id).toString())
    alert("이미지 업로드 완료" + JSON.stringify(response));
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
  }, [currHouse]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsBinaryString(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        let cpy = imageSrc;
        cpy.img = btoa(reader.result);
        setImageSrc(cpy);
        let copyArray = [...imageList];
        copyArray[currHouse].img = btoa(reader.result);
        setImageList(copyArray);
        fetchImg(btoa(reader.result));
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
          {imageSrc && imageSrc.img != "" && <img src={`data:image;base64,${imageSrc.img}`} alt="preview-img" />}
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