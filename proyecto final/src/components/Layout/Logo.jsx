import React from 'react'
import flor from '../../img/Logo.png'

function Logo({
  src = logoPng,
  alt = 'Condimentos la Guaria',
  size = 64,            // px o '8rem'
  framed = false,       // si quieres marco
  className = '',
}) {
  const w = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className={`logo ${framed ? 'logo--frame' : ''} ${className}`}>
      <img src={src} alt={alt} style={{ width: w, height: w, objectFit: 'contain' }} />
    </div>
  );
}

export default Logo