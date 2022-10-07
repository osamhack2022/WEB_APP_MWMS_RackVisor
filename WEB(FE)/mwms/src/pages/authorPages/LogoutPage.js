import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("이름", "");
    localStorage.setItem("직책", "");
    localStorage.setItem("계급", "");
    window.location.replace("/");
  }, [])

  return (
    <div>logout</div>
  )
}

export default LogoutPage