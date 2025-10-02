import React from 'react'
import { Link, NavLink } from "react-router-dom"
import '../../styles/Header.css'
import logo from '../../img/Logo.png'

function Navbar() {
  return (
    <header className="nav">
      <div className="container">
        <div className="logo-navbar">
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>
        <Link to="/home" className="brand">Condimentos la Guaria</Link>
        <nav className="links">
          <NavLink to="/condimentos">Condimentos</NavLink>
          <NavLink to="/recetas">Recetas</NavLink>
          <NavLink to="/comentarios">Comentarios</NavLink>
          <NavLink to="/about">Acerca de</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar