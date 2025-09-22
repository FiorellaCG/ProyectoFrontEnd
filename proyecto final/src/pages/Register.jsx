import React from 'react'
import RegisterForm from '../components/Domain/RegisterForm'
import '../styles/Register.css'

function Register(){
  return (
    <div className="register-page">
      <div className="register-card">
        <div className="form-grid">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
