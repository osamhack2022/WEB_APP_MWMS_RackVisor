import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import Forum from '../../utils/forum/Forum'
import SearchInput from '../../utils/search/SearchInput';
import HouseImageList from '../../utils/houseImage/HouseImageList';
import SimpleSearch from '../../components/SimpleSearchList';
import styles from '../../style';

function AuthorMainPage() {
  let auth = useAuth();
  const navigate = useNavigate();
  const valList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const data = [{'이름' : '휴지', '종류' : '2종', '세부분류' : '기타물자류', '수량':1000, '상태':'좋음', '기한':'2022/10/27'}]
  useEffect(() => {
    /*
    if(!auth.unitSelected) {
      alert("부대를 선택해주세요");
      navigate("/");
    }
    */
  }, []);

  return (
    <div class="w-full bg-[#202020] overflow-hidden">

      <div class={`bg-primary-900 ${styles.flexCenter}`}>
        <div class={`xl:max-w-[1920px] w-full`}>
          <AuthorHeader/>
        </div>
      </div>
      
      <div class={`${styles.flexStart}`}>  
        <Sidebar/>

        <div class="flex-1 grid grid-cols-2 gap-4 ">
          <div class={`md:my-0 my-10 relative mt-6`}>
            {/* gradient start */}
            {/* <div class="absolute pointer-events-none z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div class="absolute pointer-events-none z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
            <div class="absolute pointer-events-none z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
            {/* gradient end */}
            <div class="justify-center flex">
            <div class="text-white text-xl font-semibold ml-11 mt-6">공지 사항 🔔</div>
            </div>
            <div class="flex justify-center">
            <Forum/>
            </div>
          </div>

          <div class="justify-center">
            <div class="text-white text-xl font-semibold m-3">간단 검색 🔍<br/></div>
            <div class="px-4 py-3 w-[40rem] drop-shadow-xl">
              <div class="bg-[#323232] rounded-2xl">
                <SearchInput />
                <SimpleSearch defaultList={valList} data={data}/>
              </div>
            </div>
          </div>
          
          <div class = "flex-1">
          <div class="flex justify-center">
            <div class="text-white text-xl font-semibold ml-11 m-3">창고 배치도 🖽</div>
            </div>
            <HouseImageList/>
          </div>
        </div>
      </div>


      <div class={`bg-[#202020] ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>


    </div>
  )
}

export default AuthorMainPage