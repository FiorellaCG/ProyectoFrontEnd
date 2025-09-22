import React from 'react'
import '../styles/About.css'
import flor from '../components/Layout/Logo';

function About() {
  return (
    <main className="about-page">
      <div className="about-container">
        <section className="about-copy">
          <h1>Condimentos la Guaria</h1>
          <p>
            Cuerpo de texto de todo tu artículo o publicación. Insertemos un poco de
            contenido para mostrar cómo podría verse una página completa.
          </p>
          <p>
            Excepteur efficient emerging, minim veniam anim aute carefully curated
            conversation exquisite perfect nostrud nisi. Content first-class nulla ut.
            Punctual adipisicing, essential lovely queen tempor eiusmod irure.
          </p>
        </section>

        <aside className="about-figure">
          <div className="about-imageFrame">
            <img src={flor} alt="Flor representativa de La Guaria" />
          </div>
        </aside>
      </div>
    </main>
  );
}

export default About