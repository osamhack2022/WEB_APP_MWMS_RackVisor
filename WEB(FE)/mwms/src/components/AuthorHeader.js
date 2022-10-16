import React, {useState} from 'react'
import logoImg from '../images/logo.png'
import { useAuth } from '../routes/AuthContext';
import AlarmDropDown from '../utils/AlarmDropDown';
import DropDown from '../utils/DropDown';
import AlarmModal from '../utils/modal/AlarmModal';
import SettingModal from '../utils/modal/SettingModal';
import UserDropDown from '../utils/UserDropDown';
import { Link } from 'react-router-dom';
import styles from '../style.js'

function AuthorHeader() {
  const [alarm, setAlarm] = useState(false);
  const [setting, setSetting] = useState(false);

  const name = localStorage.getItem("이름");
  const position = localStorage.getItem("직책");
  const classes = localStorage.getItem("계급");

  let auth = useAuth();

  return (
    <div>
      <nav class="bg-primary-900 w-full flex py-6 justify-between items-center navbar">
        
        <a href="./" class="flex items-center">
          <img src= {logoImg} class="w-[124px] h-[48px]" alt="logo image" />
        </a>

        <div class="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[5px] mb-2">
            <p class={`${styles.paragraph} ml-2`}>
              {localStorage.getItem("부대")}
            </p>
        </div>

        
        <ul class="list-none sm:flex hidden justify-end items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-bold md:border-0 md:bg-transparent ">
          <AlarmDropDown/>
          <span class="text-white">{position}</span>
          <UserDropDown milClass={classes} name={name}/>
          {/* <Link to="/cost">환경설정</Link> */}
        </ul>
        
        
      </nav>
    </div>
  )
}

export default AuthorHeader