import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import loginButtonList from '../../utils/loginButtonList';
import { useState, useEffect } from 'react';

function SignupPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [milClass, setMilClass] = useState("");
  const [unit, setUnit] = useState("");
  const [pos, setPos] = useState("");
  const milClassList = ["이병", "일병", "상병", "병장", "하사", "중사", "상사", "원사", "준위", "소위", "중위", "대위", "소령", "중령", "대령", "준장", "소장", "중장", "대장", "원수"]

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

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onMilClass = (event) => {
    setMilClass(event.target.value);
  }

  const onUnit = (event) => {
    setUnit(event.currentTarget.value);
  }

  const onPos = (event) => {
    setPos(event.currentTarget.value);
  }

  const register = () => {
    //입력한 값이 valid 한지 확인하는 로직이 필요
    //서버와 통신하는 부분 - dumy value 가져갈 필요
    alert("회원가입이 되었습니다. 로그인해주세요");
    window.location.replace("/login");
  };

  const cancel = () => {
    setId("");
    setPw("");
    setName("");
    setMilClass("");
    setUnit("");
    setPos("");
  };

  return (
    <div>
      <body>
        <Header buttonList={loginButtonList} isLogin={false}/>
        <div>
          signupPage  
        </div>
        <div>
          이름
          <input class ="border" type="text" value={name} onChange={onNameHandler}></input>
        </div> 
        <div>
          군번
          <input class ="border" type="text" value={id} onChange={onIdHandler}></input>
        </div>
        <div>
          비밀번호
          <input class ="border" type="password" value={pw} onChange={onPasswordHandler}></input>
        </div>
        <div>
          계급
          <select class = "border" onChange={onMilClass} value={milClass}>
            {milClassList.map((millC) => (
              <option value={millC} key={millC}>
                {millC}
              </option>
            ))}
          </select>
        </div>
        <div>
          소속
          <input class ="border" type="text" value={unit} onChange={onUnit}></input>
        </div>
        <div>
          직책
          <input class ="border" type="text" value={pos} onChange={onPos}></input>
        </div>
        <button onClick={register}>가입</button>
        <button onClick={cancel}>취소</button>
        <Footer/>
      </body>
    </div>
  )
}

export default SignupPage