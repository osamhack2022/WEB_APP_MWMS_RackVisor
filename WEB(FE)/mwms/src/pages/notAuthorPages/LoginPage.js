import React, { useState, useEffect } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom"
import styles from '../../style.js'
import Title from '../../utils/with_description'

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

  const signUp =() => {
    navigate("/signup");
  }

  const login = () => {
    localStorage.setItem("token", "123"); 
    //서버와 통신 로직 추가 필요

    localStorage.setItem("이름", "홍길동");
    localStorage.setItem("직책", "행정보급관");
    localStorage.setItem("계급", "상사");

    window.location.replace("/");
  };

  return (

    <div class="bg-primary-900 w-full overflow-hidden">\
      <div class={`bg-primary-900 ${styles.flexCenter}`}>
        <div class={`${styles.boxWidth}`}>
          <Header/>
        </div>
      </div>

      
      <Title title={"로그인"} />
      
      <section>
        
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full max-w-[400px] bg-[#0c161f] rounded mx-auto p-8 px-8 sm:max-w-md">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h2 class="text-xl font-bold leading-tight text-center tracking-tight text-white md:text-xl">
                      국방물자관리체계<br/>
                      <span class="text-gradient">Military Warehouse{" "}</span><br/>
                      Management System
                  </h2>
                  <form class="space-y-4 md:space-y-6" action="#">
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">군번</label>
                          <input 
                            type="text" 
                            name="id" 
                            id="id" 
                            class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
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
                            class="bg-gray-700 border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700" 
                            value={pw}
                            onChange={onPasswordHandler}/>
                      </div>
                      <button 
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={login}
                      >
                        로그인
                      </button>
                  </form>

                  <button 
                        class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={signUp}
                      >
                        회원가입
                  </button>
              </div>
          </div>
        </div>
      </section>
      

      <div class={`bg-primary-900 ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
      
    </div>
  )
}

export default LoginPage