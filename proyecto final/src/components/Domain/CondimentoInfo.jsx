//CREAR CONDIMENTO
import React, { useState } from 'react'
import Services from '../../services/Services';

function CondimentoInfo({ onSaved }) {
  const [nombre, setNombre] = useState('');
  const [beneficios, setBeneficios] = useState('');
  const [origen, setOrigen] = useState('');
  const [imagen, setImagen] = useState('');
  const [errores, setErrores] = useState({});
  // Expresión regular para validar URLs de imágenes
  const urlRegex = /^(https?:\/\/).+\.(png|jpe?g|gif|webp|svg)$/i;

 // Valida los campos del formulario
  const validar = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = 'El nombre es obligatorio.';
    if (!beneficios.trim()) e.beneficios = 'Los beneficios son obligatorios.';
    if (!origen.trim()) e.origen = 'El origen es obligatorio.';
    if (!imagen.trim()) {
      e.imagen = 'La URL de la imagen es obligatoria.';
    } else if (!urlRegex.test(imagen.trim())) {
      e.imagen = 'Ingrese un URL válido (http/https) que termine en .png/.jpg/.jpeg/.gif/.webp/.svg';
    }
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const guardarCondimento = async () => {
    if (!validar()) return;
    // Aquí puedes realizar la llamada a la API para guardar el condimento
    try {
      const nuevoCondimento = {
        nombre,
        beneficios,
        origen,
        imagen
      };

      // Guardar en el servidor
      await Services.postDatos('condimentos', nuevoCondimento);
      // limpiar
      setNombre('');
      setBeneficios('');
      setOrigen('');
      setImagen('');
      setErrores({});
      onSaved?.();
    } catch (err) {
      console.error('Error al guardar condimento:', err);
    }
  };

  const mostrarPreview = imagen && urlRegex.test(imagen.trim());

  return (
    <>
      <h2 className="register-title">Agregar Condimento</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="nombre">Nombre</label>
        <input id="nombre" className={`form-input ${errores.nombre ? 'is-invalid' : ''}`}
          type="text" placeholder="Ej: Cúrcuma" value={nombre} onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errores.nombre} aria-describedby={errores.nombre ? 'error-nombre' : undefined}/>
        {errores.nombre && <p id="error-nombre" className="error">{errores.nombre}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="beneficios">Beneficios</label>
        <textarea id="beneficios" className={`form-input form-textarea ${errores.beneficios ? 'is-invalid' : ''}`}
          placeholder="Propiedades, usos saludables, etc." rows={6} value={beneficios}
          onChange={(e) => setBeneficios(e.target.value)} aria-invalid={!!errores.beneficios}
          aria-describedby={errores.beneficios ? 'error-beneficios' : undefined}/>
        {errores.beneficios && <p id="error-beneficios" className="error">{errores.beneficios}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="origen">Origen</label>
        <input id="origen" className={`form-input ${errores.origen ? 'is-invalid' : ''}`}
          type="text"  placeholder="Ej: India, Caribe, Costa Rica…"
          value={origen} onChange={(e) => setOrigen(e.target.value)}
          aria-invalid={!!errores.origen} aria-describedby={errores.origen ? 'error-origen' : undefined} />
        {errores.origen && <p id="error-origen" className="error">{errores.origen}</p>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="imagen">Imagen (URL)</label>
        <input id="imagen" className={`form-input ${errores.imagen ? 'is-invalid' : ''}`}
          type="url" placeholder="https://ejemplo.com/curcuma.jpg"
          value={imagen} onChange={(e) => setImagen(e.target.value)}
          aria-invalid={!!errores.imagen} aria-describedby={errores.imagen ? 'error-imagen' : undefined} />
        {errores.imagen && <p id="error-imagen" className="error">{errores.imagen}</p>}
      </div>

      {mostrarPreview && (
        <div className="form-field">
          <label className="form-label">Vista previa</label>
          <img
            src={imagen}
            alt={`Imagen de ${nombre || 'condimento'}`}
            style={{ maxWidth: '280px', width: '100%', borderRadius: '8px', display: 'block' }}
            loading="lazy"
          />
        </div>
      )}

      <button className="btn-submit" onClick={guardarCondimento}>
        Guardar
      </button>
    </>
  );
}

export default CondimentoInfo