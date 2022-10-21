import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';

function LogoutPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    auth.houseSelect({});
    auth.unitSelect({});
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