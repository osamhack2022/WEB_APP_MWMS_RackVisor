import React from 'react'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import loginButtonList from '../../utils/loginButtonList'

function MainPage() {
  return (
    <div>
      <body>
      <Header buttonList={loginButtonList} isLogin={false}/>
      <div class="text-center mx-4 my-20 space-y-2" >
        <h1 class="text-black-600 text-5xl font-bold">
          국방물자관리체계<br />
          Military Warehouse Management System
        </h1>
        
        { /* TODO: Demo Video */}
        <div class="grid h-screen place-items-center">
          <iframe width="840" height="472" src="https://www.youtube.com/embed/7Dbu5M2utEA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p>

        </p>
      </div>
      <Footer />
      </body>
    </div>
  )
}

export default MainPage