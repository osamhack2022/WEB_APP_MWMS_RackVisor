import React, { useCallback, useEffect, useState } from 'react'
import { axiosGet, axiosPut } from '../../api';
import { useAuth } from '../../routes/AuthContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { render } from '@headlessui/react/dist/utils/render';

function ImageChangeList() {
  const [ name, setName ] = useState();
  const [ source, setSource ] = useState();
  const [ houseList, setHouseList] = useState([]);
  const [ idx, setIdx ] = useState(0);
  const [fileInput, setFileInput] = useState([]);
  const auth = useAuth();
  const currUnit = auth.unitSelected;

  useEffect(() => {
    fetchImgList();
  }, []);

  useEffect(() => {
    setName(houseList[idx].name);
    setSource(houseList[idx].imgBase64);
  }, [idx]);

  const fetchImgList = useCallback(async () => {
    const data = await axiosGet("/warehouses/my-warehouses/" + (currUnit.id).toString());
    if (data.length > 0) {
      setName(data[0].name);
      setSource(data[0].imgBase64);
    } else {
      setName(" ");
      setSource(" ");
    }
  })
  
  const fetchImg = async (src) => {
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

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        let copyHouseList = [...houseList];
        copyHouseList[idx].imgBase64 = render.result;
        setHouseList(copyHouseList);
        setSource(render.result);
        fetchImg(reader.result);
        resolve();
      };
    });
  };

  const onLeft = () => {
    setIdx(idx > 0 ? idx - 1 : idx)
  }

  const onRight = () => {
    setIdx(idx < houseList.length - 1 ? idx + 1 : idx)
  }


  return (
    <div class="text-center bg-[#323232] w-[42rem] rounded-2xl pb-3">
      <div class="flex justify-center">
        <p class="flex text-center text-white  mt-3 mb-5">
          <ChevronLeftIcon className={"mt-1 rounded-full h-5 w-5 hover:text-[#7A5EA6] " + ((idx > 0 ? ("") : (" text-[#323232]")))} aria-hidden="true" onClick={onLeft}/>
          <div class="ml-2 mr-2 text-xl">
          {name}
          </div>
          <ChevronRightIcon className={"mt-1 rounded-full h-5 w-5 hover:text-[#7A5EA6] " + (((houseList.length - 1 > idx) ? ("") : (" text-[#323232]")))} aria-hidden="true" onClick={onRight}/>
        </p>
      </div>
      {   
      <main className="container px-3">
        <div className="preview flex justify-center">
          {source && <img src={source} alt="preview-img" />}
          <div class="hidden"> {render} </div>
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

export default ImageChangeList