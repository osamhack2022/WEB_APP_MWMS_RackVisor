import React from 'react'
import Header from '../../components/Header'
import Footer from "../../components/Footercopy";
import styles from '../../style'
import Hero from '../../components/Hero'

function MainPage() {
  return (
    <div class="bg-primary-900 w-full h-screen overflow-hidden">


      <div class={`bg-primary-900 ${styles.flexCenter}`}>
        <div class={`${styles.boxWidth}`}>
          <Header/>
        </div>
      </div>


      <div class={`bg-primary-900 h-full ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth} h-max`}>
          <Hero />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainPage