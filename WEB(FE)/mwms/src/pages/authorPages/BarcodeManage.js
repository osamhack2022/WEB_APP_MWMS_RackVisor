import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';


function BarcodeManage() {
  const navigate = useNavigate();
  let auth = useAuth();

  useEffect(() => {
    if (auth.unitSelected === "") {
      alert("부대를 다시 선택해주세요");
      navigate("/");
    }
  }, []);

  return (
    <div>
      BarcodeManage
    </div>
  )
}

export default BarcodeManage