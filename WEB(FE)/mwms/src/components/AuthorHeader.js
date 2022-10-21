import React, {useState} from 'react'
import logoImg from '../images/Image.jpeg'
import { useAuth } from '../routes/AuthContext';
import AlarmDropDown from '../utils/AlarmDropDown';
import DropDown from '../utils/DropDown';
import AlarmModal from '../utils/modal/AlarmModal';
import SettingModal from '../utils/modal/SettingModal';
import UserDropDown from '../utils/UserDropDown';
import { Link } from 'react-router-dom';
import styles from '../style.js'
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'

function AuthorHeader() {
  const [alarm, setAlarm] = useState(false);
  const [setting, setSetting] = useState(false);
  const [toggle, setToggle] = useState(false);

  const name = localStorage.getItem("이름");
  const position = localStorage.getItem("직책");
  const classes = localStorage.getItem("계급");

  let auth = useAuth();

  return (
    <div>
      <nav class="bg-[#323232] w-full flex justify-between py-3 justify-start items-center navbar">
        
        <a href="./" class="flex items-center">
          <img src= {logoImg} class="w-[150px] h-[70px]" alt="logo image" />
        </a>

        <div class="py-[6px] px-4 text-white text-2xl rounded-[5px] mb-2">
            <p class="ml-2">
              {auth.unitSelected.name}
            </p>
        </div>

        
        <ul class="list-none sm:flex hidden justify-end items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-bold md:border-0 md:bg-transparent ">
          <AlarmDropDown/>
          <span class="text-white mr-10">{position}</span>
          <UserDropDown milClass={classes} name={name}/>
          {/* <Link to="/cost">환경설정</Link> */}
        </ul>
        

        <div class="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle? close: menu}
            alt="menu"
            class="w-[28px] h-[28px]
            object-contain"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            class={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            
            <ul class="list-none flex flex-col justify-end items-center flex-1">
              <AlarmDropDown/>
              <span class="text-white mr-10">{position}</span>
              <UserDropDown milClass={classes} name={name}/>
              {/* <Link to="/cost">환경설정</Link> */}
            </ul>
        


          </div>
        </div>

        
      </nav>
    </div>
  )
}

export default AuthorHeader