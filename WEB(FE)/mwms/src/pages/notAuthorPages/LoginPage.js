import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import loginButtonList from "../../utils/loginButtonList";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  
  useEffect(() => {
    localStorage.setItem("token", "");
  }, []);

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPw(event.currentTarget.value);
  };

  const login = () => {
    localStorage.setItem("token", "123"); 
    //서버와 통신 로직 추가 필요

    localStorage.setItem("이름", "홍길동");
    localStorage.setItem("직책", "행정보급관");
    localStorage.setItem("계급", "상사");

    window.location.replace("/");
  };

  return (
    <div>
      <body>
        <Header buttonList={loginButtonList} isLogin={false}/>
        <div>loginPage</div>
        <div>
          아이디
          <input class ="border" type="text" value={id} onChange={onIdHandler}></input>
        </div> 
        <div>
          비밀번호
          <input class ="border" type="password" value={pw} onChange={onPasswordHandler}></input>
        </div>
        <button onClick={login}>로그인</button>
        <Footer/>
      </body>
    </div>
  )
}

export default LoginPage