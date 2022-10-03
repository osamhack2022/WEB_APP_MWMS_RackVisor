import React from 'react';
import Author from './Author';
import NotAuthor from './NotAuthor';

const isLogin = () => !!localStorage.getItem("token");

function Routing() {
  return (
    <div>
      {isLogin() ? <Author /> : <NotAuthor />}
    </div>
  )
}

export default Routing