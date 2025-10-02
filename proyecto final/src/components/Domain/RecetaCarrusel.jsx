import React, { useEffect, useRef, useState } from "react";
import '../../styles/Carrusel.css'
import Services from "../../services/Services";
import { useNavigate } from "react-router-dom";

function RecetaCarrusel({ titulo = "Recetas" }) {
  const [recetas, setRecetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const listaRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const nav = useNavigate();

  // Carga las recetas desde el servicio
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // Solicita las recetas al servicio
        const data = await Services.getDatos("recetas");
        const normalizados = (data || []).map((r) => ({
          // Asegura que cada receta tenga un id, título, descripción e imagen
          id: r.id ?? crypto.randomUUID(),
          titulo: (r.titulo || "").trim(),
          descripcion: r.descripcion || "Sin descripción",
          imagen: r.imagen || "",
        }));
        setRecetas(normalizados);
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
    if (!el) return;
    actualizarFlechas();
    el.addEventListener("scroll", actualizarFlechas, { passive: true });
    // Detecta cambios en el tamaño de la ventana
    window.addEventListener("resize", actualizarFlechas);
    return () => {
      el.removeEventListener("scroll", actualizarFlechas);
      window.removeEventListener("resize", actualizarFlechas);
    };
  }, [recetas.length]);
  // Desplaza el carrusel por el ancho de una tarjeta
  const desplazarPorTarjeta = (direccion) => {
    const el = listaRef.current;
    if (!el) return;
    const tarjeta = el.querySelector(".receta-card");
    const ancho = tarjeta ? tarjeta.offsetWidth + 24 : 320;
    el.scrollBy({ left: direccion * ancho, behavior: "smooth" });
  };

  if (isLoading) return <p>Cargando recetas…</p>;
  if (errorMsg) return <p style={{ color: "crimson" }}>Error: {errorMsg}</p>;
  if (!recetas.length) return <p>No hay recetas registradas.</p>;

  return (
    <section className="carousel receta">
      <h2 className="carousel__title">{titulo}</h2>

      {showPrev && (
        <button className="carousel__nav carousel__nav--left" onClick={() => desplazarPorTarjeta(-1)}
          aria-label="Anterior"> ‹ </button>
      )}
      {showNext && (
        <button className="carousel__nav carousel__nav--right"onClick={() => desplazarPorTarjeta(1)}
          aria-label="Siguiente"> › </button>
      )}

      <div className="carousel__track" ref={listaRef}>
        {recetas.map((item) => (
          <article className="card receta-card" key={item.id} onClick={() => nav(`/receta/${item.id}`)}>
            <div className="card__img">
              <img src={item.imagen} alt={item.titulo} loading="lazy" />
            </div>
            <div className="card__body">
              <h3 className="receta-nombre">{item.titulo}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecetaCarrusel;
