import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { useAuth } from "../../routes/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthorHeader from "../../components/AuthorHeader";
import Title from "../../utils/with_description";
import styles from "../../style.js";
import Button from "../../components/Button";
import { axiosGet, axiosPost } from "../../api";

export const getLSUnitList = () => [];

function UnitSelect() {
  const navigate = useNavigate();
  const [unitList, setUnitList] = useState([]);
  //11번째 줄에서 서버에서 unit의 리스트를 받아오면 된다
  let auth = useAuth();

  const onSelectUnit = (e) => {
    //TODO _ API
    auth.unitSelect(unitList.find((unit) => (unit.id == e.target.id)));
    e.stopPropagation();
    navigate("/main");
  };

  const addUnit = async () => {
    const newName = prompt("부대명을 입력해주세요"); //부대명이 서로 달라야 함
    if (newName === null) {
      return;
    }

    // ? Add Unit
    let itemToAdd = {
      name: newName,
      comment: newName,
    };

    //TODO _ API
    const itemResponse = await axiosPost("/units", itemToAdd);
    itemToAdd.id = itemResponse.id;

    setUnitList((prev) => [...prev, itemToAdd]);
  };

  const fetchUnitList = useCallback(async () => {
    try {
      const data = await axiosGet("/units/all-units");
      setUnitList(data);
    } catch (error) {
      alert("Error on fetching unit");
    }
  }, []);

  useEffect(() => {
    auth.unitSelect({});
    
    //TODO _ API
    fetchUnitList();
  }, []);

  return (
    <div class="bg-[#202020] w-full">
      <div class={`bg-[#323232] ${styles.flexCenter}`}>
        <div class={`${styles.boxWidth}`}>
          <AuthorHeader />
        </div>
      </div>
      <div class="mt-5"></div>
      <Title title={"부대 선택"} />
      <div class={`h-screen mx-48 px-32 `}>
        <div class="grid grid-cols-4 gap-4 mt-5">
          {unitList.map((un) => (
            <Button
              id={un.id}
              text={un.name}
              handleClick={onSelectUnit}
              class="hover:border-[#7A5EA6] hover:bg-[#7A5EA6] hover:text-white py-4 px-6 font-poppins font-bold text-[24px] text-primary-900 bg-[#706F6F] rounded-[10px]"
            />
          ))}
          <Button
            text={"+ 부대 추가"}
            handleClick={addUnit}
            class="hover:border-[#7A5EA6] hover:bg-[#7A5EA6] hover:text-white py-4 px-6 font-poppins font-bold text-[24px] text-primary-900 bg-[#706F6F] rounded-[10px]"
          />
        </div>
      </div>

      <div class={`bg-[#202020] ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default UnitSelect;
