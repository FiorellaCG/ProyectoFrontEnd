import React from 'react'
import imagen from '../../img/Imagen2.jpg'
import '../../styles/Imagen.css'


function Imagen() {
  return (
    <div className="imagen-banner">
      <img src={imagen} alt="Descripción de la imagen" className="imagen-banner__img" />
      <div className="imagen-banner__overlay">
        <h1 className="imagen-banner__titulo">Condimentos la Guaria</h1>
      </div>
    </div>
  );
}

export default Imagen;