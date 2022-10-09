import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <body>
        <Header/>
        <h1 class="border-b-2 m-6 ml-40 pl-8 pb-6 font-bold text-4xl">회원가입</h1>  
        <section>
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="이름"
                      value={name} 
                      onchange={onNameHandler}
                    />
                  </div>
                  <div>
                    <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">군번</label>
                    <input 
                      type="text" 
                      name="id" 
                      id="id" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="군번"
                      value={id} 
                      onchange={onIdHandler}
                    />
                  </div>
                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="비밀번호" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      value={pw}
                      onChange={onPasswordHandler}/>
                  </div>
                  <div>
                    <label for="milClass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">계급</label>
                    <select class = "border" onChange={onMilClass} value={milClass}>
                      {milClassList.map((millC) => (
                        <option value={millC} key={millC}>
                          {millC}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">소속</label>
                    <input 
                      type="text" 
                      name="id" 
                      id="id" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="소속"
                      value={unit} 
                      onchange={onUnit}
                    />
                  </div>
                  <div>
                    <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">직책</label>
                    <input 
                      type="text" 
                      name="id" 
                      id="id" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="직책"
                      value={pos} 
                      onchange={pos}
                    />
                  </div>
                  <button 
                    class="w-full border-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={register}
                  >
                    회원가입
                  </button>
                  <button 
                    class="w-full border-2 text-black bg-white-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={cancel}
                  >
                    취소
                  </button>
                </form>
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