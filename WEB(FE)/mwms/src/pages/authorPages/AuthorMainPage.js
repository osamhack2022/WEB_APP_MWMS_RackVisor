import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import Forum from '../../utils/forum/Forum'
import SearchInput from '../../utils/search/SearchInput';
import HouseImageList from '../../utils/houseImage/HouseImageList';
import Example from '../../components/simple_striped';

function AuthorMainPage() {
  let auth = useAuth();
  const navigate = useNavigate();
  const valList = ['이름', '종류', '세부분류', '수량', '상태', '기한']
  const data = [{'이름' : '휴지', '종류' : '2종', '세부분류' : '기타물자류', '수량':1000, '상태':'좋음', '기한':'2022/10/27'}]
  useEffect(() => {
    if(localStorage.getItem("부대") == "") {
      alert("부대를 선택해주세요");
      navigate("/");
    }
  }, []);

  return (
    <div>
      <AuthorHeader/>
      <div class="flex">  
        <Sidebar/>
        <div class="flex-1">
          <div>공지 사항</div>
          <Forum/>
          <div>창고 도면</div>
          <HouseImageList/>
        </div>
        <div class = "flex-1">
          <div>간단 검색</div>
          <SearchInput/>
          <Example defaultList={valList} data={data} setSelect={() => {}}/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AuthorMainPage