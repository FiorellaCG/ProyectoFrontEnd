import React, { useState } from 'react';
import Services from '../../services/Services';

function RecetaInfo({ onSaved }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [errores, setErrores] = useState({});

  const urlRegex = /^(https?:\/\/).+\.(png|jpe?g|gif|webp|svg)$/i;

  const validar = () => {
    const e = {};
    if (!titulo.trim()) e.titulo = 'El título es obligatorio.';
    if (!descripcion.trim()) e.descripcion = 'La descripción es obligatoria.';
    if (!imagen.trim()) {
      e.imagen = 'La URL de la imagen es obligatoria.';
    } else if (!urlRegex.test(imagen.trim())) {
      e.imagen = 'Ingrese un URL válido (http/https) que termine en .png/.jpg/.jpeg/.gif/.webp/.svg';
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardarReceta = async () => {
    if (!validar()) return;

    try {
      const nuevaReceta = { titulo, descripcion, imagen };
      await Services.postDatos('recetas', nuevaReceta);
      // limpiar
      setTitulo('');
      setDescripcion('');
      setImagen('');
      setErrores({});
      onSaved?.();
    } catch (err) {
      console.error('Error al guardar receta:', err);
    }
  };

  const mostrarPreview = imagen && urlRegex.test(imagen.trim());

  return (
    <>
      <h2 className="register-title">Agregar Receta</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="titulo">Título</label>
        <input
          id="titulo"
          className={`form-input ${errores.titulo ? 'is-invalid' : ''}`}
          type="text"
          placeholder="Ej: Arroz con cúrcuma"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
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
          placeholder="Escriba los pasos de la receta"
          rows={6}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          aria-invalid={!!errores.descripcion}
          aria-describedby={errores.descripcion ? 'error-descripcion' : undefined}
        />
        {errores.descripcion && <p id="error-descripcion" className="error">{errores.descripcion}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="imagen">Imagen (URL)</label>
        <input
          id="imagen"
          className={`form-input ${errores.imagen ? 'is-invalid' : ''}`}
          type="url"
          placeholder="https://ejemplo.com/receta.jpg"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          aria-invalid={!!errores.imagen}
          aria-describedby={errores.imagen ? 'error-imagen' : undefined}
        />
        {errores.imagen && <p id="error-imagen" className="error">{errores.imagen}</p>}
      </div>

      {mostrarPreview && (
        <div className="form-field">
          <label className="form-label">Vista previa</label>
          <img
            src={imagen}
            alt={`Imagen de ${titulo || 'receta'}`}
            style={{ maxWidth: '280px', width: '100%', borderRadius: '8px', display: 'block' }}
            loading="lazy"
          />
        </div>
      )}

      <button className="btn-submit" onClick={guardarReceta}>
        Guardar
      </button>
    </>
  );
}
export default RecetaInfo