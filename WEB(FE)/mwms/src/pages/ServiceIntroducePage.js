import React from 'react'
import Header from '../components/Header';
import loginButtonList from '../utils/loginButtonList';
import Footer from '../components/Footer';

function ServiceIntroducePage() {
  return (
    <body>
      <div>
        <Header buttonList={loginButtonList} />
        <div>ServiceIntroducePage</div>
        <Footer />
      </div>
    </body>
  )
}

export default ServiceIntroducePage