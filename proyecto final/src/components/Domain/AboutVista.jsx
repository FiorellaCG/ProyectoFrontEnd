import React from "react";
import { Link } from "react-router-dom"; 
import logo from "../../img/"             
import "../../styles/About.css";

function AboutVista() {
  return (
    <section className="about">
      <div className="about__grid">
        <div className="about__content">
          <h1 className="about__title">Acerca de nosotros</h1>

          <h2 className="about__subtitle">Subtítulo</h2>
          <p className="about__text">
            Excepteur efficient emerging, minim veniam anim aute carefully curated
            guacin. Espresso exquisite perfect robust nit intricate content.
          </p>
          <p className="about__text">
            Exquisite sophisticated iconic cutting-edge laborum deserunt esse
            bureau cupidatat id minim. Sharp classic the best commodo custodial
            delightful.
          </p>

          {/* Si no usas React Router, reemplaza por:
              <a href="/contacto" className="about__cta">Contáctenos</a> */}
          <Link to="/contacto" className="about__cta">Contáctenos</Link>
        </div>

        <div className="about__imageWrap">
          <img src={logo} alt="Logo Condimentos la Guaria" className="about__image" />
        </div>
      </div>
    </section>
  );
}

export default AboutVista;
