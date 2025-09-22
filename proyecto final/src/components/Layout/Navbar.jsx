import React from 'react'
import {Link, NavLink} from "react-router-dom"

function Navbar() {
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand">Condimentos la Guaria</Link>
        <nav className="links">
          <NavLink to="/condimentos">Condimentos</NavLink>
          <NavLink to="/recetas">Recetas</NavLink>
          <NavLink to="/about">Acerca</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar