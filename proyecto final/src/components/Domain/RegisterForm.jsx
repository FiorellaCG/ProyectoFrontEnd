import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Services from '../../services/Services';
import '../../styles/Register.css'

function RegisterForm({ onSaved }) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contra, setContra] = useState('');

  const cargarUsuarios = async () => {
    try {
      const nuevoUsuario = { nombre, apellido, email, contra };
      await Services.postDatos('usuarios', nuevoUsuario);
      setNombre(''); 
      setApellido(''); 
      setEmail(''); 
      setContra('');
      onSaved?.();
    } catch (e) { console.error(e); }
  };

  return (
    <>
    <h2 className="register-title">Registro</h2>
      <div className="form-field">
        <label className="form-label" htmlFor="nombre">Nombre</label>
        <input id="nombre" className="form-input" type="text" placeholder="Ingrese su nombre" value={nombre}
         onChange={(e)=>setNombre(e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="apellido">Apellido</label>
        <input id="apellido" className="form-input" type="text" placeholder="Ingrese sus apellidos" value={apellido}
         onChange={(e)=>setApellido(e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="email">Email</label>
        <input id="email" className="form-input" type="email" placeholder="Ingrese su email" value={email}
         onChange={(e)=>setEmail(e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contra">Contraseña</label>
        <input id="contra" className="form-input" type="password" placeholder="Ingrese una nueva contraseña" value={contra}
         onChange={(e)=>setContra(e.target.value)} />
      </div>

      <button className="btn-submit" onClick={cargarUsuarios}> Enviar </button>
    </>
  );
}

export default RegisterForm;
