import React, { useCallback, useEffect, useState } from 'react'
import { axiosGet, axiosPut } from '../../api';
import { useAuth } from '../../routes/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

function HouseImageList() {
  const [fileInput, setFileInput] = useState([]);
  const [imgBase64, setImgBase64] = useState("");
  const [idx, setIdx] = useState(0);
  const [houseList, setHouseList] = useState([]);
  const [name, setName] = useState("");
  const auth = useAuth();
  const currUnit = auth.unitSelected;

  const fetchImgList = useCallback(async () => {
    console.log("실행됨14");
    const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
    if (data.length > 0) {
      console.log("여기는?");
      setHouseList(data);
      setImgBase64(data[0].imgBase64);
      setName(data[0].name);
      console.log(data[0].imgBase64);
    }
  }, []);

  useEffect(() => {
    console.log("실행됨13");
    fetchImgList();
  }, []);

  const fetchImg = async (src) => {
    console.log("실행됨12");
    let copyOne = houseList[idx];
    let itemToAdd = {
      imgBase64 : src
    }

    try {
      await axiosPut("/warehouses/house-image/" + (copyOne.id).toString(), itemToAdd);
      await axiosGet("/warehouses/" + (copyOne.id).toString());
      console.log("문제없음")
    } catch (e) {
      console.log("문제있음")
    }
  }

  const onLeft = () => {
    setIdx(idx > 0 ? idx - 1 : idx)
  }

  const onRight = () => {
    setIdx(idx < houseList.length - 1 ? idx + 1 : idx)
  }

  // useEffect(() => {
  //   console.log("실행됨1");
  //   if (idx != -1) {
  //     console.log("실행됨15");

  //     if (houseList.length >= idx && houseList[idx].name && houseList[idx].imgBase64) {
  //       console.log("실행됨16");
  //       console.log(houseList[idx].name);
  //       console.log(houseList[idx].imgBase64);
  //       setName(houseList[idx].name);
  //       setImgBase64(houseList[idx].imgBase64);
  //     }
  //   }
  //   setFileInput([]);
  // }, [idx]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        
        let copyArray = [...houseList];
        copyArray[idx].imgBase64 = reader.result;
        setHouseList(copyArray);
        setImgBase64(reader.result);
        console.log(reader.result);
        fetchImg(reader.result);
        resolve();
      };
    });
  };

  return (
    <div class="text-center bg-[#323232] w-[42rem] rounded-2xl pb-3">
      <div class="flex justify-center">
        <p class="flex text-center text-white  mt-3 mb-5">
          <ChevronLeftIcon className={"mt-1 rounded-full h-5 w-5 hover:text-[#7A5EA6] " + ((idx > 0 ? ("") : (" text-[#323232]")))} aria-hidden="true" onClick={onLeft}/>
          <div class="ml-2 mr-2 text-xl">
          {name ? name : ""}
          </div>
          <ChevronRightIcon className={"mt-1 rounded-full h-5 w-5 hover:text-[#7A5EA6] " + (((houseList.length - 1 > idx) ? ("") : (" text-[#323232]")))} aria-hidden="true" onClick={onRight}/>
        </p>
      </div>
      {   
      <main className="container px-3">
        <div className="preview flex justify-center">
          {imgBase64 && <img src={imgBase64} alt="preview-img" />}
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