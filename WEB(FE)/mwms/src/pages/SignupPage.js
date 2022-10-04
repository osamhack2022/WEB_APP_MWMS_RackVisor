import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import loginButtonList from '../utils/loginButtonList';

function SignupPage() {
  return (
    <div>
      <body>
        <Header buttonList={loginButtonList}/>
        <div>
          signupPage  
        </div>  
        <Footer/>
      </body>
    </div>
  )
}

export default SignupPage