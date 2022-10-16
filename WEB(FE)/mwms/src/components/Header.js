import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../images/logo.png'
import close from '../assets/close.svg'
import menu from '../assets/menu.svg'

const loginButtonList = [
  {link : "/", name : "홈", index: 0,},
  {link : "/introduction", name : "서비스 소개", index:1,},
  {link : "/signup", name : "회원가입", index:2,},
  {link : "/login", name : "로그인", index:3,},
]

function Header() {

  const [toggle, setToggle] = useState(false)

  return (
    <div>
      <nav class="bg-primary-900 w-full flex py-6 justify-between items-center navbar">
        
        <a href="./" class="flex items-center">
          <img src= {logoImg} class="w-[124px] h-[48px]" alt="logo image" />
        </a>

        
        <ul class="list-none sm:flex hidden justify-end items-center flex-1">
          {loginButtonList.map(button => (
            <li>
              <Link to={button.link} class={`font-poppins font-normal cursor-pointer text-[16px] ${button.index === loginButtonList.length - 1? 'mr-0' : 'mr-10'} text-white hover:text-blue-300`}>{button.name}</Link>
            </li>
          ))}
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
              {loginButtonList.map(button => (
                <li>
                  <Link to={button.link} class={`font-poppins font-normal cursor-pointer text-[16px] ${button.index === loginButtonList.length - 1? 'mr-0' : 'mb-4'} text-white hover:text-blue-300`}>{button.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Header