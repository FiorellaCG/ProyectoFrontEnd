import React from 'react'
import "../../styles/Footer.css"
import logo from "../../img/Logo.png"

function Footer() {
    return (
        <footer className="footer">
            <div className="contenedor-footer">
                
                <div className="footer-col">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <p className="footer-nombre">Condimentos la Guaria</p>
                </div>

                <div className="footer-col">
                    <p className="footer-titulo"><b>Escríbenos</b></p>
                    <p>Numero: 7015-0047</p>
                    <p>Email: laguaria@gmail.com</p>
                </div>
                
                <div className="footer-col">
                    <p className="footer-titulo"><b>Nos encontramos en...</b></p>
                    <p>Zapote, Calle Mora, San Jose</p>
                    <p>Horario: Lunes a Viernes 8:00am - 5:00pm</p>
                </div>
            </div>

        
        </footer>
    )
}


export default Footer