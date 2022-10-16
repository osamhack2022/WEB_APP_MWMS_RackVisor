import React, {useState} from 'react'
import logoImg from '../images/logo.png'
import { useAuth } from '../routes/AuthContext';
import AlarmDropDown from '../utils/AlarmDropDown';
import DropDown from '../utils/DropDown';
import AlarmModal from '../utils/modal/AlarmModal';
import SettingModal from '../utils/modal/SettingModal';
import UserDropDown from '../utils/UserDropDown';

function AuthorHeader() {
  const [alarm, setAlarm] = useState(false);
  const [setting, setSetting] = useState(false);

  const name = localStorage.getItem("이름");
  const position = localStorage.getItem("직책");
  const classes = localStorage.getItem("계급");

  let auth = useAuth();

  return (
    <div>
      <nav class="p-5 bg-gray-50 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="./" class="flex items-center">
              <img src= {logoImg} class="mr-9 h-9 sm:h-9" alt="logo image" />
          </a>
          <div class="border">{auth.unitSelected}</div>
          <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul class="flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-bold md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <AlarmDropDown/>
              <span>{position}</span>
              <UserDropDown milClass={classes} name={name}/>
              <span onClick={() => setSetting(true)}>환경설정</span>
              {setting ? <SettingModal onClose={() => setSetting(false)}/> : ""}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AuthorHeader