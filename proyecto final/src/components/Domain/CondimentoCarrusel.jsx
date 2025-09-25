import React, { useEffect, useRef, useState } from "react";
import "../../styles/Carrusel.css";
import Services from "../../services/Services";

function CondimentoCarrusel({ titulo = "Condimentos" }) {
  const [condimentos, setCondimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Referencia al carril que hace scroll
  const listaRef = useRef(null);

  // Mostrar/ocultar flechas
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  // Cargar datos
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await Services.getDatos("condimentos");
        const normalizados = (data || []).map((c) => ({
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

  // Actualiza el estado de las flechas según la posición del scroll
  const actualizarFlechas = () => {
    const el = listaRef.current;
    if (!el) return;
    const alInicio = el.scrollLeft <= 1;
    const alFinal = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    setShowPrev(!alInicio);
    setShowNext(!alFinal);
  };

  // Escuchar scroll/resize para ocultar/mostrar flechas
  useEffect(() => {
    const el = listaRef.current;
    if (!el) return;
    actualizarFlechas();
    el.addEventListener("scroll", actualizarFlechas, { passive: true });
    window.addEventListener("resize", actualizarFlechas);
    return () => {
      el.removeEventListener("scroll", actualizarFlechas);
      window.removeEventListener("resize", actualizarFlechas);
    };
  }, [condimentos.length]);

  // Desplazar una tarjeta a la vez
  const desplazarPorTarjeta = (direccion) => {
    const el = listaRef.current;
    if (!el) return;
    const tarjeta = el.querySelector(".cond-card");
    const ancho = tarjeta ? tarjeta.offsetWidth + 24 : 320; // 24 = gap
    el.scrollBy({ left: direccion * ancho, behavior: "smooth" });
  };

  if (isLoading) return <p>Cargando condimentos…</p>;
  if (errorMsg) return <p style={{ color: "crimson" }}>Error: {errorMsg}</p>;
  if (!condimentos.length) return <p>No hay condimentos registrados.</p>;

  return (
    <section className="carousel cond">
      <h2 className="carousel__title">{titulo}</h2>

      {/* Flechas laterales */}
      {showPrev && (
        <button
          className="carousel__nav carousel__nav--left"
          onClick={() => desplazarPorTarjeta(-1)}
          aria-label="Anterior"
        >
          ‹
        </button>
      )}
      {showNext && (
        <button
          className="carousel__nav carousel__nav--right"
          onClick={() => desplazarPorTarjeta(1)}
          aria-label="Siguiente"
        >
          ›
        </button>
      )}

      {/* Carril con tarjetas */}
      <div className="carousel__track" ref={listaRef}>
        {condimentos.map((item) => (
          <article className="card cond-card" key={item.id}>
            <div className="card__img">
              <img src={item.imagen} alt={item.nombre} loading="lazy" />
            </div>
            <div className="card__body">
              {/* Solo nombre y origen */}
              <h3 className="cond-nombre">{item.nombre}</h3>
              <p className="cond-origen">{item.origen}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CondimentoCarrusel;

