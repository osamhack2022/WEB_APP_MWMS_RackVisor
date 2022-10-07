import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import loginButtonList from '../../utils/loginButtonList'
import ExampleModal from '../../utils/modal/ExampleModal'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link} from 'react-router-dom';

function AuthorMainPage() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <AuthorHeader/>
      <button onClick={() => setOpen(true)}>모달열기</button>
      {open ? <ExampleModal onClose={() => setOpen(false)}/> : ""}
      <Link to="/barcode">바코드요</Link>
      <Footer/>
    </div>
  )
}

export default AuthorMainPage