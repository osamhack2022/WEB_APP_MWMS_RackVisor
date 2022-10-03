import React, { useState, useEffect } from "react";

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

  const setLogin = () => {
    localStorage.setItem("token", "123");
    window.location.replace("/");
  };

  return (
    <div>
      <div>loginPage</div>
      <input type="text" value={id} onChange={onIdHandler}></input>
      <input type="password" value={pw} onChange={onPasswordHandler}></input>
      <button onClick={setLogin}>로그인</button>
    </div>
  )
}

export default LoginPage