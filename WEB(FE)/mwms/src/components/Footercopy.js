import React from 'react'
import logoImg from '../images/logo.png'

function Footer() {
  return (
    <div>
      <footer class="p-4 bg-primary-900 shadow">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="./" class="flex items-center mb-4 sm:mb-0">
                <span class = "text-2xl text-white font-bold text-gradient">MWMS</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        
        <span class="block text-sm text-gray-500 sm:text-center">© 2022 <a href="./" class="hover:underline">MWMS</a>. All Rights Reserved.
        </span>
     </footer>
    </div>
  )
}

export default Footer