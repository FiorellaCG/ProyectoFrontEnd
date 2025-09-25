import React, { useEffect, useRef, useState } from "react";
import "../../styles/Carrusel.css";
import Services from "../../services/Services";

export default function RecetaCarrusel({ titulo = "Recetas" }) {
  const [recetas, setRecetas] = useState([]);
  const listaRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await Services.getDatos("recetas");
      const normalizados = (data || []).map((r) => ({
        id: r.id ?? crypto.randomUUID(),
        nombre: (r.titulo || r.nombre || "").trim(),
        imagen: r.imagen || "",
      }));
      setRecetas(normalizados);
    })();
  }, []);

  const actualizarFlechas = () => {
    const el = listaRef.current;
    if (!el) return;
    const alInicio = el.scrollLeft <= 1;
    const alFinal = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
    setShowPrev(!alInicio);
    setShowNext(!alFinal);
  };

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
  }, [recetas.length]);

  const desplazar = (dir) => {
    const el = listaRef.current;
    if (!el) return;
    const card = el.querySelector(".rec-card");
    const w = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section className="carousel rec">
      <h2 className="carousel__title">{titulo}</h2>
      {showPrev && <button className="carousel__nav carousel__nav--left" onClick={() => desplazar(-1)}>‹</button>}
      {showNext && <button className="carousel__nav carousel__nav--right" onClick={() => desplazar(1)}>›</button>}

      <div className="carousel__track" ref={listaRef}>
        {recetas.map((r) => (
          <article className="card rec-card" key={r.id}>
            <div className="card__img">
              <img src={r.imagen} alt={r.nombre} loading="lazy" />
            </div>
            <div className="card__body">
              <h3 className="rec-nombre">{r.nombre}</h3>
              <p className="rec-origen">{r.origen}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
