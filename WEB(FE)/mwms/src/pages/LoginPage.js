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

  return (
    <div>
      <div>loginPage</div>
      <input type="text" value={id} onChange={onIdHandler}></input>
      <input type="password" value={pw} onChange={onPasswordHandler}></input>
    </div>
    
  )
}

export default LoginPage