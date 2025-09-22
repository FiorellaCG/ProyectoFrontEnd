import React from 'react'
import LoginForm from '../components/Domain/LoginForm'
import '../styles/Login.css'

function Login() {

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="form-grid">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login