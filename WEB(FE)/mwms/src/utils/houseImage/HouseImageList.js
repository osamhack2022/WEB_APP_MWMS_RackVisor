import React, { useCallback, useEffect, useState } from 'react'
import { axiosGet, axiosPut } from '../../api';
import { useAuth } from '../../routes/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'


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
        newDa.img = da.imgBase64;
        newImgList.push(newDa);
      });
      setImageList(newImgList);

      if (newImgList) {
        setImageSrc(newImgList[0]);
      }

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
    console.log(src);
    try {
      await axiosPut("/warehouses/house-image/" + (copyOne.id).toString(), itemToAdd);
      await axiosGet("/warehouses/" + (copyOne.id).toString());
      console.log("문제없음")
    } catch (e) {
      console.log("문제있음")
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
        copyArray[currHouse].img = btoa(reader.result);
        setImageList(copyArray);
        
        fetchImg(reader.result);
        resolve();
      };
    });
  };

  return (
    <div class="text-center bg-[#323232] w-[42rem] rounded-2xl pb-3">
      <div class="flex justify-center">
        <p class="flex text-center text-white  mt-3 mb-5">
          <ChevronLeftIcon className={"mt-1 rounded-full h-5 w-5 hover:text-[#7A5EA6] " + ((currHouse > 0 ? ("") : (" text-[#323232]")))} aria-hidden="true" onClick={onLeft}/>
          <div class="ml-2 mr-2 text-xl">
          {imageSrc && imageSrc.name}
          </div>
          <ChevronRightIcon className={"mt-1 rounded-full h-5 w-5 hover:text-[#7A5EA6] " + (((houseList.length - 1 > currHouse) ? ("") : (" text-[#323232]")))} aria-hidden="true" onClick={onRight}/>
        </p>
      </div>
      {   
      <main className="container px-3">
        <div className="preview flex justify-center">
          {imageSrc && imageSrc.img && <img src={imageSrc.img ? imageSrc.img : ""} alt="preview-img" />}
        </div>
        <label class=" text-[#5AB0AD] pb-3 mb-3 hover:text-white" for="file-input">도면 업로드</label>
        <input class="hidden" id="file-input" type="file" onChange={(e) => {
          setFileInput(e.target.files[0]);
          encodeFileToBase64(e.target.files[0]);
        }} files={fileInput} />
      </main>}
    </div>
  )
}

export default HouseImageList