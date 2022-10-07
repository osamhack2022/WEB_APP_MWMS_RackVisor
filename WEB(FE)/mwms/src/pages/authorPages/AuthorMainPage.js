import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import loginButtonList from '../../utils/loginButtonList'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/SearchInput'

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
      </div>
      <Footer/>
    </div>
  )
}

export default AuthorMainPage