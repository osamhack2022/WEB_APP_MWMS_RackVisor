import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import loginButtonList from '../../utils/loginButtonList'
import ExampleModal from '../../utils/modal/ExampleModal'

function AuthorMainPage({unit}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header buttonList={loginButtonList}/>
      <button onClick={() => setOpen(true)}>모달열기</button>
      {open ? <ExampleModal onClose={() => setOpen(false)}/> : ""}
      <Footer/>
    </div>
  )
}

export default AuthorMainPage