import React from 'react'
import logo from '../../assets/logo.png'
import '../../styles/header.css'

function Header() {
  return (
    <div className="header-container">
        <img className="logo" src={logo}></img>
        <div className="header-text">
            Weather Data
        </div>
    </div>
  )
}

export default Header