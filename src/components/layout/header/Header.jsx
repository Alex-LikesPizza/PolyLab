import React from 'react'
import logo from "../../../images/vite.svg"
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className="header">
      <img className='header__logo' src={logo} alt="logo" />
      <nav className="header__nav">
        <button className="no-button"><Link to="/">Home</Link></button>
        <button className="no-button"><Link to="/learn">Learn</Link></button>
        <button className="no-button"><Link to="/about">Contact us</Link></button>
      </nav>
      <div className="header__account ">
        <button className="no-button"><Link to="/sign-in">Sign In</Link></button>
      </div>
    </header>
  )
}

export default Header