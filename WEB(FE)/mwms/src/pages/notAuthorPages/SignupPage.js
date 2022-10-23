import React from 'react';
import Header from '../../components/Header';
import Footer from "../../components/Footercopy";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPost } from '../../api';
import styles from "../../style.js";
import Title from '../../utils/with_description';
import Button from '../../components/Button';

function SignupPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [milClass, setMilClass] = useState("");
  const [unit, setUnit] = useState("");
  const [pos, setPos] = useState("");
  const milClassList = ["이병", "일병", "상병", "병장", "하사", "중사", "상사", "원사", "준위", "소위", "중위", "대위", "소령", "중령", "대령", "준장", "소장", "중장", "대장", "원수"]

  useEffect(() => {
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
    setMilClass(event.currentTarget.value);
  }

  const onUnit = (event) => {
    setUnit(event.currentTarget.value);
  }

  const onPos = (event) => {
    setPos(event.currentTarget.value);
  }

  const register = async () => {
    //입력한 값이 valid 한지 확인하는 로직이 필요
    //서버와 통신하는 부분 - dumy value 가져갈 필요
    let itemToAdd = {
      name: name,
      militarySerialNumber: id,
      rank: milClass,
      reigment: unit,
      position: pos,
      password: pw
    }
    try {
      await axiosPost('/users', itemToAdd);
    } catch (e) {
      alert("회원가입 오류");
    }
    alert("회원가입이 되었습니다. 로그인해주세요");
    navigate("/login");
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
    <div class="bg-primary-900 w-full overflow-hidden">
      <body>
        <div class={`bg-primary-900 mb-4 ${styles.flexCenter}`}>
          <div class={`${styles.boxWidth}`}>
            <Header />
          </div>
        </div>
        <Title title={"회원가입"}/>
        <section>
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full max-w-[600px] bg-[#0c161f] rounded mx-auto p-8 px-8 sm:max-w-md">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h2 class="text-xl font-bold leading-tight text-center tracking-tight text-white md:text-xl">
                  국방물자관리체계
                  <br />
                  <span class="text-gradient">Military Warehouse </span>
                  <br />
                  Management System
                </h2>
                <div class="space-y-4 md:space-y-6">
                  <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-white">이름</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      placeholder="이름"
                      value={name} 
                      onChange={onNameHandler}
                    />
                  </div>
                  <div>
                    <label for="id" class="block mb-2 text-sm font-medium text-white">군번</label>
                    <input 
                      type="text" 
                      name="id" 
                      id="id" 
                      class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      placeholder="군번"
                      value={id} 
                      onChange={onIdHandler}
                    />
                  </div>
                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-white">비밀번호</label>
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="비밀번호" 
                      class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      value={pw}
                      onChange={onPasswordHandler}/>
                  </div>
                  <div>
                    <label for="milClass" class="block mb-2 text-sm font-medium text-white">계급</label>
                    <div>
                      <select
                        id="location"
                        name="location"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        onChange={onMilClass} 
                        value={milClass}
                      >
                        {milClassList.map((millC) => (
                          <option value={millC} key={millC}>
                            {millC}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label for="id" class="block mb-2 text-sm font-medium text-white">소속</label>
                    <input 
                      type="text" 
                      name="id" 
                      id="id" 
                      class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      placeholder="소속"
                      value={unit} 
                      onChange={onUnit}
                    />
                  </div>
                  <div>
                    <label for="id" class="block mb-2 text-sm font-medium text-white">직책</label>
                    <input 
                      type="text" 
                      name="id" 
                      id="id" 
                      class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      placeholder="직책"  
                      value={pos} 
                      onChange={onPos}
                    />
                  </div>
                  <Button 
                    class="w-full text-primary-900 bg-secondary hover:bg-cyan-600 font-semibold rounded-lg px-5 py-2.5 text-center"
                    onClick={register}
                    text={"회원가입"}
                  />
                  <Button 
                    class="w-full text-white bg-gray-600 hover:bg-black font-semibold rounded-lg px-5 py-2.5 text-center"
                    onClick={cancel}
                    text={"취소"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </body>
    </div>
  )
}

export default SignupPage