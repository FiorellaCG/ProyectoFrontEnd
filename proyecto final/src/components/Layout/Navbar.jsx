import React from 'react'
import {Link, NavLink} from "react-router-dom"
import '../../styles/Header.css'

function Navbar() {
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand">Condimentos la Guaria</Link>
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