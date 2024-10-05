import React from 'react'
import logo from '../Assets/logoBlack.svg'
import { Link } from "react-router-dom";
const LoginPageHeader = (props:any) => {
  return (
    <div style={{margin:"1% 2%"}}>
    <div>
      <Link to="/home"> {/* This ensures the logo links to the home page */}
        <img src={logo} height="40px" alt="logo" />
      </Link>
    </div>
    {props.children}
    </div>
  )
}

export default LoginPageHeader