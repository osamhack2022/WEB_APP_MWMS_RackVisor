import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import loginButtonList from "../utils/loginButtonList";

function LoginPage() {
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  
  useEffect(() => {
    console.log("LoginPage render ...");
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
    window.location.replace("/");
  };

  return (
    <div>
      <body>
        <Header buttonList={loginButtonList}/>
        <div>loginPage</div>
        <input type="text" value={id} onChange={onIdHandler}></input>
        <input type="password" value={pw} onChange={onPasswordHandler}></input>
        <button onClick={login}>로그인</button>
      </body>
    </div>
  )
}

export default LoginPage