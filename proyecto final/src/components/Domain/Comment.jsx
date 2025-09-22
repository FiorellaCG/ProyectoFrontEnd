import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Services from '../../services/Services';


function Comment({onSaved})  {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const cargarComentarios = async () => {
    try {
      const nuevoComentario = { titulo, descripcion };
      await Services.postDatos('comentarios', nuevoComentario);
      setTitulo(''); 
      setDescripcion(''); 
      onSaved?.();
    } catch (e) { console.error(e); }
  };

  return (
    <>
      <div className="form-field">
        <label className="form-label" htmlFor="titulo">Título</label>
        <input id="titulo" className="form-input" type="text" placeholder="Ingrese un titulo a la receta" value={titulo}
         onChange={(e)=>setTitulo(e.target.value)} />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="descripcion">Descripción</label>
        <input id="descripcion" className="form-input" type="text" placeholder="Ingrese los pasos a realizar la receta" value={descripcion}
         onChange={(e)=>setDescripcion(e.target.value)} />
      </div>

      <button className="btn-submit" onClick={cargarComentarios}> Enviar </button>
    </>
  );
}

export default Comment