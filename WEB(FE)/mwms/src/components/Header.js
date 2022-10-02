import React from 'react'
import logoImg from '../images/logo.png'

function Header() {
  return (
    <div> 
      <img src= {logoImg} class="mr-3 h-6 sm:h-9" alt="logo image" />
    </div>
  )
}

export default Header