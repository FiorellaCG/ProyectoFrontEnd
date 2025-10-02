import React from 'react'
import Comment from '../components/Domain/Comment'
import ComentariosVer from '../components/Domain/ComentariosVer'
import '../styles/ComentariosVer.css'

function Comentarios() {
  return ( 
  <div className="register-page">
      <div className="register-card">
        <div className="form-grid">
          <ComentariosVer />
          <Comment />
        </div>
      </div>
    </div>
  )
}

export default Comentarios