import React from 'react'

function UnitManagementPage() {
  const logout = () => {
    localStorage.setItem("token", "");
    window.location.replace("/");
  }
  return (
    <div>UnitManagementPage
      <button onClick={logout}>로그아웃</button>
    </div>
  )
}

export default UnitManagementPage