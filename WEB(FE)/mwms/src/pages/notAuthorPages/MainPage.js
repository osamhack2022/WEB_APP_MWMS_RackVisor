import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from '../../style'
import Hero from '../../components/Hero'

function MainPage() {
  return (
    <div class="bg-primary-900 w-full overflow-hidden">


      <div class={`${styles.paddingX} ${styles.flexCenter}`}>
        <div class={`${styles.boxWidth}`}>
          <Header/>
        </div>
      </div>


      <div class={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div class={`${styles.boxWidth}`}>
          <Hero/>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MainPage