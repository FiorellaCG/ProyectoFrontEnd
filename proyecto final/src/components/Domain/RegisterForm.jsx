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
  const [mensajeGeneral, setMensajeGeneral] = useState(''); // si quieres mostrar mensajes generales

  const validar = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!apellido.trim()) e.apellido = "El apellido es obligatorio.";
    if (!email.trim()) {
      e.email = "El email es obligatorio.";
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) e.email = "Formato de email no válido.";
    }
    if (!contra.trim()) e.contra = "La contraseña es obligatoria.";

    setErrores(e);
    // devolver true si no hay errores, false si hay errores
    return Object.keys(e).length === 0;
  };

  const cargarUsuarios = async () => {
    if (!validar()) return; // ahora validar() devuelve boolean

    try {
      const nuevoUsuario = { nombre, apellido, email, contra };
      const respuesta = await Services.postDatos('usuarios', nuevoUsuario);
      if (!respuesta || respuesta.error) throw new Error('No se pudo guardar');

      // limpiar inputs y errores
      setNombre('');
      setApellido('');
      setEmail('');
      setContra('');
      setErrores({});
      setMensajeGeneral('Usuario registrado con éxito.');

      onSaved?.();
      navigate("/home");
    } catch (err) {
      console.error(err);
      setMensajeGeneral('Ocurrió un error al guardar. Revisa la consola y la conexión con el servidor.');
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

      <button type="button" className="btn-submit" onClick={cargarUsuarios}> Enviar </button>

      {mensajeGeneral && <p className="mensaje-general">{mensajeGeneral}</p>}
    </>
  );
}

export default RegisterForm;

