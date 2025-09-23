import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Services from '../../services/Services';


function Comment({ onSaved })  {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({});

  const validar = () => {
    const e = {};
    if (!titulo.trim()) e.titulo = "El título es obligatorio.";
    if (!descripcion.trim()) e.descripcion = "La descripción es obligatoria.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const cargarComentarios = async () => {
    if (!validar()) return; // no sigue si hay errores

    try {
      const nuevoComentario = { titulo, descripcion };
      await Services.postDatos('comentarios', nuevoComentario);
      setTitulo(''); 
      setDescripcion(''); 
      setErrores({});
      onSaved?.();
      // navigate('/...') // si quieres redirigir
    } catch (e) { 
      console.error(e); 
    }
  };

  return (
    <>
      <h2 className="register-title">Comentarios</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="titulo">Título</label>
        <input
          id="titulo"
          className={`form-input ${errores.titulo ? 'is-invalid' : ''}`}
          type="text"
          placeholder="Ingrese un título a la receta"
          value={titulo}
          onChange={(e)=>setTitulo(e.target.value)}
          aria-invalid={!!errores.titulo}
          aria-describedby={errores.titulo ? 'error-titulo' : undefined}
        />
        {errores.titulo && <p id="error-titulo" className="error">{errores.titulo}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          className={`form-input form-textarea ${errores.descripcion ? 'is-invalid' : ''}`}
          placeholder="Ingrese los pasos para realizar la receta"
          value={descripcion}
          onChange={(e)=>setDescripcion(e.target.value)}
          aria-invalid={!!errores.descripcion}
          aria-describedby={errores.descripcion ? 'error-descripcion' : undefined}
        />
        {errores.descripcion && <p id="error-descripcion" className="error">{errores.descripcion}</p>}
      </div>

      <button className="btn-submit" onClick={cargarComentarios}>Enviar </button>
    </>
  );
}

export default Comment