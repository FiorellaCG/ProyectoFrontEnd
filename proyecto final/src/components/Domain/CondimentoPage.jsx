// src/pages/CondimentoPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Services from "../../services/Services";
import '../../styles/CondimentosPage.css';

export default function CondimentoPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  // Cargar el condimento por ID
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let data = null;
        // Si el servicio tiene un método específico para obtener por ID, usarlo
        if (typeof Services.getCondimentoById === "function") {
          data = await Services.getCondimentoById(id);
        } else {
          // fallback: obtener todos y filtrar
          const all = await Services.getDatos("condimentos");
          data = (all || []).find((c) => String(c.id) === String(id)) || null;
        }
        // Si no se encuentra, mostrar error

        if (!data) {
          setErr("No se encontró el condimento solicitado.");
        } else {
          // Normalizar y establecer el estado
          setItem({
            id: data.id ?? id,
            nombre: data.nombre ?? "Sin nombre",
            origen: data.origen ?? "Origen no especificado",
            imagen: data.imagen ?? "",
            beneficios: data.beneficios ?? "", // si existe
            // agrega otros campos que tengas
          });
        }
      } catch (e) {
        setErr(e.message || "Error al cargar el condimento.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Cargando condimento…</p>;
  if (err) return (
    <main className="cond-detail-page">
      <p style={{ color: "crimson" }}>{err}</p>
      <button onClick={() => nav(-1)}>Volver</button>
    </main>
  );
  if (!item) return (
    <main className="cond-detail-page">
      <p>No hay detalles para este condimento.</p>
      <button onClick={() => nav(-1)}>Volver</button>
    </main>
  );

 return (
  <main className="condimento">
    <button onClick={() => nav(-1)} className="condimento__back-btn">← Volver</button>

    <section className="condimento__detail">
      

      <div className="condimento__info">
        <h1 className="condimento__title">{item.nombre}</h1>
        <div className="condimento__img-wrapper">
        {item.imagen ? (
          <img src={item.imagen} alt={item.nombre} className="condimento__img" />
        ) : (
          <div className="condimento__placeholder">Sin imagen</div>
        )}
      </div>
        <p className="condimento__origen"><strong>Origen:</strong> {item.origen}</p>
        {item.beneficios && <p className="condimento-beneficios"><strong>Beneficios:</strong> {item.beneficios}</p>}
        {/* Aquí puedes agregar más campos con la misma convención */}
      </div>
    </section>
  </main>
)

}
