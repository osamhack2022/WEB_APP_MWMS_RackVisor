import React from 'react'
import { useEffect } from 'react';

function LogoutPage() {
  useEffect(() => {
    localStorage.setItem("token", "");
    window.location.replace("/");
  }, [])

  return (
    <div>logout</div>
  )
}

export default LogoutPage