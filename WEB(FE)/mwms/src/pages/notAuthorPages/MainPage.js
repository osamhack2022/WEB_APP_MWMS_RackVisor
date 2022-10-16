import React from 'react'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from '../../style.js'

function MainPage() {
  return (
    <div class="bg-primary-900 w-full overflow-hidden">


      <div class={`${styles.paddingX} ${styles.flexCenter}`}>
        <div class={`${styles.boxWidth}`}>
          <Header/>
        </div>
      </div>


      <div class={`bg-primary  ${styles.flexStart}`}>
        <div class={`${styles.boxwidth}`}>
          <div class="text-center text-white mx-4 my-20 space-y-2" >
          <h1 class="text-black-600 text-5xl font-bold">
            국방물자관리체계<br />
            Military Warehouse Management System
          </h1>
          
          { /* TODO: Demo Video */}
          <div class="grid h-screen place-items-center">
            <iframe width="840" height="472" src="https://www.youtube.com/embed/7Dbu5M2utEA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div> 

      <div class={`bg-primary $ ${styles.flexStart}`}>
        <div class={`${styles.boxwidth}`}>
        </div>
      </div>

      </div>

      <div class={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainPage