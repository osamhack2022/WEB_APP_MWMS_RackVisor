import React, { useEffect } from 'react'



function BarcodeManage(unit) {
  useEffect(() => {
    if (unit === "") {
      alert("부대를 다시 선택해주세요");
      window.location.replace("/");
    }
  }, []);

  return (
    <div>
      BarcodeManage
    </div>
  )
}

export default BarcodeManage