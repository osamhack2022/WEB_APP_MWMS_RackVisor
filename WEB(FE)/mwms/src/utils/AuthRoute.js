import React from 'react'
import { Route, Navigate } from "react-router-dom";

const isLogin = () => !!localStorage.getItem("token");

function AuthRoute({ version, component: Component, ...rest }) {
  return (
    <Route
    {...rest}
    render={(props) =>
      isLogin() ? <Component {...props} /> : <Navigate to="/login" />
    }
    />
  )
}

export default AuthRoute