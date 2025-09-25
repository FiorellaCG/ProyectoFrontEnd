import React from 'react'
import "../../styles/Footer.css"
import logo from "../../img/Logo.png"

function Footer() {
    return (
        <footer className="footer">
            <div className="contenedor-footer">
                {/* Logo y nombre */}
                <div className="footer-col">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <p className="footer-nombre">Condimentos la Guaria</p>
                </div>

                {/* WhatsApp */}
                <div className="footer-col">
                    <p className="footer-titulo"><b>WhatsApp</b></p>
                    <p>Numero: 7015-0047</p>
                </div>

                {/* Email */}
                <div className="footer-col">
                    <p className="footer-titulo"><b>Escríbenos</b></p>
                    <p>laguaria@gmail.com</p>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Condimentos la Guaria • Hecho con ❤️ en CR</p>
            </div>
        </footer>
    )
}


export default Footer