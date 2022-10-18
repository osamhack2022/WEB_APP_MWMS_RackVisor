import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { useAuth } from '../../routes/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthorHeader from '../../components/AuthorHeader';
import Title from '../../utils/with_description';
import styles from '../../style.js';
import Button from '../../components/Button';
import { axiosPost } from '../../api';

// lsUnitList 예시 [{name: "123부대"}, {name: "456부대"}, ... ]
export function getLSUnitList()
{
  let lsUnitList = localStorage.getItem("unitList");
  if(lsUnitList === null)
  {
    lsUnitList = [];
  }
  else
  {
    lsUnitList = JSON.parse(lsUnitList);
  }
  return lsUnitList;
}

let lsUnitList = getLSUnitList();

function UnitSelect() {
  const navigate = useNavigate();
  const [unitList, setUnitList] = useState(lsUnitList);
  //11번째 줄에서 서버에서 unit의 리스트를 받아오면 된다
  let auth = useAuth();

  const onSelectUnit = (e) => {
    auth.unitSelect(e.target.id);
    localStorage.setItem("부대", e.target.id);
    e.stopPropagation();
    navigate("/main");
  }

  const addUnit = async () => {
    const newName = prompt("부대명을 입력해주세요"); //부대명이 서로 달라야 함
    if (newName === null) {
      return;
    }
    let lsUnitList = getLSUnitList();
    lsUnitList.push({
      name: newName,
      houseList: [],
    });

    // ? Add Unit
    await axiosPost("/units", {
      name: newName,
      comment: newName,
    });
    localStorage.setItem("unitList", JSON.stringify(lsUnitList));
    setUnitList(lsUnitList);
  }

  useEffect(() => {
    auth.unitSelect("");
    let lsUnitList = getLSUnitList();
    setUnitList(lsUnitList);
    localStorage.setItem("부대", "");
  }, []);

  return (
    <div class="bg-primary-900 w-full">

      <div class={`bg-primary-900 ${styles.flexCenter}`}>
        <div class={`${styles.boxWidth}`}>
          <AuthorHeader />
        </div>
      </div>

      <Title title={"부대 선택"} />
      <div class={`h-screen mx-48 px-32 `}>
        <div class="grid grid-cols-4 gap-4 px-4 py-3">
          {unitList.map((un) => (
            <Button id={un.name} text={un.name} handleClick={onSelectUnit} class="hover:border-green-500 py-4 px-6 font-poppins font-bold text-[24px] text-primary-900 bg-blue-gradient border-2 border-white rounded-[10px]" />
          ))}
          <Button text={"+ 부대 추가"} handleClick={addUnit} class="hover:border-green-500 py-4 px-6 font-poppins font-bold text-[24px] text-primary-900 bg-blue-gradient border-2 border-white rounded-[10px]"/>
        </div>
      </div>

      <div class={`bg-primary-900 ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    
    </div>
  )
}

export default UnitSelect