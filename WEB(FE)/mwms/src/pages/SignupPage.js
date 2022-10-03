import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logoutButtonList from '../utils/logoutButtonList';

function SignupPage() {
  return (
    <div>
      <body>
        <Header buttonList={logoutButtonList}/>
        <div>
          signupPage  
        </div>  
        <Footer/>
      </body>
    </div>
  )
}

export default SignupPage