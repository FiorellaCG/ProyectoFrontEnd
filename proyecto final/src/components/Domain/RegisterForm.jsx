//LISTOO

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
  const [errores, setErrores] = useState({});
  const [mensajeGeneral, setMensajeGeneral] = useState('');

  const validar = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!apellido.trim()) e.apellido = "El apellido es obligatorio.";
    if (!email.trim()) {
      e.email = "El email es obligatorio.";
    } else {
      //Validar formato de email, utilizando regex
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) e.email = "Formato de email no válido.";
    }
    if (!contra.trim()) e.contra = "La contraseña es obligatoria.";

    setErrores(e);
   
  };

  const cargarUsuarios = async () => {
    if (!validar()) return; // si hay errores, no continúa

    try {
      const nuevoUsuario = { nombre, apellido, email, contra };
      await Services.postDatos('usuarios', nuevoUsuario);

      // limpiar inputs y errores
      setNombre(''); 
      setApellido(''); 
      setEmail(''); 
      setContra('');
      setErrores({});
      setMensajeGeneral('');

      onSaved?.();
      navigate("/login"); // ejemplo de redirección
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <h2 className="register-title">Registro</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="nombre">Nombre</label>
        <input id="nombre" className="form-input" type="text" placeholder="Ingrese su nombre" 
          value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="apellido">Apellido</label>
        <input id="apellido" className="form-input" type="text" placeholder="Ingrese sus apellidos" 
          value={apellido} onChange={(e)=>setApellido(e.target.value)} />
        {errores.apellido && <p className="error">{errores.apellido}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="email">Email</label>
        <input id="email" className="form-input" type="email" placeholder="Ingrese su email" 
          value={email} onChange={(e)=>setEmail(e.target.value)} />
        {errores.email && <p className="error">{errores.email}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contra">Contraseña</label>
        <input id="contra"  className="form-input"  type="password" placeholder="Ingrese una nueva contraseña" 
          value={contra} onChange={(e)=>setContra(e.target.value)} />
        {errores.contra && <p className="error">{errores.contra}</p>}
      </div>

      <button className="btn-submit" onClick={cargarUsuarios} > Enviar </button>
    </>
  );
}

export default RegisterForm;
