import React from 'react'
import Comment from '../components/Domain/Comment'
import '../styles/Comentarios.css'

function Comentarios() {
  return ( 
  <div className="register-page">
      <div className="register-card">
        <div className="form-grid">
          <Comment />
        </div>
      </div>
    </div>
  )
}

export default Comentarios