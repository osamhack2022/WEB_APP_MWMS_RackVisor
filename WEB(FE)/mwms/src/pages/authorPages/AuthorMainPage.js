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

  useEffect(() => {
    if(auth.unitSelected === "") {
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
          <Example/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AuthorMainPage