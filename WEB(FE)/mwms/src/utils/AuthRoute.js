import React from 'react'
import { Route, Redirect } from "react-router-dom";

const isLogin = () => !!localStorage.getItem("token");

function AuthRoute({ version, component: Component, ...rest }) {
  return (
    <Route
    {...rest}
    render={(props) =>
      isLogin() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
  )
}

export default AuthRoute