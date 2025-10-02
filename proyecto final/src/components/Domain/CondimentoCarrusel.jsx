import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Carrusel.css";
import Services from "../../services/Services";

function CondimentoCarrusel({ titulo = "Condimentos" }) {
  const [condimentos, setCondimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const listaRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  // Carga los condimentos desde el servicio
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await Services.getDatos("condimentos");
        const normalizados = (data || []).map((c) => ({
          // Asegura que cada condimento tenga un id, nombre, origen e imagen
          id: c.id ?? crypto.randomUUID(),
          nombre: (c.nombre || "").trim(),
          origen: c.origen || "Origen no especificado",
          imagen: c.imagen || "",
        }));
        setCondimentos(normalizados);
      } catch (e) {
        setErrorMsg(e.message || "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  // Actualiza la visibilidad de las flechas según la posición del scroll
  const actualizarFlechas = () => {
    const el = listaRef.current;
    if (!el) return;
    // Detecta si está al inicio o al final
    const alInicio = el.scrollLeft <= 1;
    const alFinal = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    setShowPrev(!alInicio);
    setShowNext(!alFinal);
  };
  // Añade listeners para actualizar las flechas al hacer scroll o redimensionar
  useEffect(() => {
    const el = listaRef.current;
    // Verifica si el elemento existe
    if (!el) return;
    actualizarFlechas();
    el.addEventListener("scroll", actualizarFlechas, { passive: true });
    window.addEventListener("resize", actualizarFlechas);
    
    // Limpia los listeners al desmontar
    return () => {
      el.removeEventListener("scroll", actualizarFlechas);
      window.removeEventListener("resize", actualizarFlechas);
    };
  }, [condimentos.length]);

  // Desplaza el carrusel por el ancho de una tarjeta
  const desplazarPorTarjeta = (direccion) => {
    const el = listaRef.current;
    if (!el) return;
    const tarjeta = el.querySelector(".cond-card");
    const ancho = tarjeta ? tarjeta.offsetWidth + 24 : 320;
    el.scrollBy({ left: direccion * ancho, behavior: "smooth" });
  };

  if (isLoading) return <p>Cargando condimentos…</p>;
  if (errorMsg) return <p style={{ color: "crimson" }}>Error: {errorMsg}</p>;
  if (!condimentos.length) return <p>No hay condimentos registrados.</p>;

  return (
    <section className="carousel cond">
      <h2 className="carousel__title">{titulo}</h2>

      {showPrev && (
        <button className="carousel__nav carousel__nav--left" onClick={() => desplazarPorTarjeta(-1)}
          aria-label="Anterior"> ‹ </button>
      )}
      {showNext && (
        <button className="carousel__nav carousel__nav--right" onClick={() => desplazarPorTarjeta(1)}
          aria-label="Siguiente"> › </button>
      )}

      <div className="carousel__track" ref={listaRef}>
        {condimentos.map((item) => (
          <Link to={`/condimentos/${item.id}`} className="card cond-card"
            key={item.id} aria-label={`Ver detalle de ${item.nombre}`}
          >
            <div className="card__img">
              <img src={item.imagen} alt={item.nombre} loading="lazy" />
            </div>
            <div className="card__body">
              <h3 className="cond-nombre">{item.nombre}</h3>
              <p className="cond-origen">{item.origen}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CondimentoCarrusel;
