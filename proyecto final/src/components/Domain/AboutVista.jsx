import React from 'react';
import '../../styles/About.css'
import logo from '../../img/Logo.png'

function AboutVista() {
  return (
    <div className="about-container">
      <div className="about-text">
        <h2>Condimentos la Guaria</h2>
        <h3>Más de 22 años llevando sabor a cada rincón</h3>
        <p>
          Fundada en el corazón de San José, <strong>Condimentos La Guaria</strong> nació como un sueño familiar:
          ofrecer productos de calidad, donde la confianza y el sabor son parte de la vida cotidiana.
        </p>
        <p>
          Desde nuestros inicios, hemos creído en el poder de lo local. Con más de dos décadas de experiencia,
          nos hemos convertido en una empacadora reconocida por pulperias.
          Cada bolsa de condimento que sale de nuestras manos lleva consigo el esfuerzo de una empresa que creció desde cero,
          con trabajo honesto y el respaldo de cientos de pulperos que confían en nosotros.
        </p>
        <p>
          Hoy, seguimos innovando sin perder nuestras raíces. Apostamos por una atención personalizada que nos distingue.
          Porque en La Guaria, no solo empacamos sabor: empacamos historia, comunidad y tradición.
        </p>
        <div className="mision-vision-container">
          <div className="mision-box">
            <h2>Misión</h2>
            <p>
              En <strong>Condimentos La Guaria</strong>, nuestra misión es ofrecer productos alimenticios de calidad que
              enriquezcan la cocina costarricense, fortaleciendo la confianza entre pulperías y consumidores.
              Nos comprometemos a mantener prácticas honestas, atención personalizada y un vínculo genuino con cada rincón del país.
            </p>
          </div>
          <div className="vision-box">
            <h2>Visión</h2>
            <p>
              Ser la empacadora líder en condimentos tradicionales en Costa Rica, reconocida por su cercanía con las comunidades,
              su innovación responsable y su capacidad de preservar la esencia de lo local mientras evoluciona con el tiempo.
            </p>
          </div>
        </div>
      </div>

      <div className="about-image">
        <img src={logo} alt="Logo de Condimentos La Guaria" />
      </div>
    </div>
  );
}

export default AboutVista;
