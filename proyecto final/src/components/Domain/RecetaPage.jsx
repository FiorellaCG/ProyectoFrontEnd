import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Services from "../../services/Services";
import '../../styles/RecetasPage.css'

function RecetaPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [receta, setReceta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
 // Carga la receta por ID
  useEffect(() => {
    (async () => {
      try {
        // Reiniciar estados
        setIsLoading(true);
        const data = await Services.getDatos(`recetas/${id}`);
        setReceta(data);
      } catch (e) {
        setErrorMsg("Error al cargar la receta");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  // Renderizado condicional según el estado
  if (isLoading) return <p>Cargando receta…</p>;
  if (errorMsg) return <p style={{ color: "crimson" }}>{errorMsg}</p>;
  if (!receta) return <p>No se encontró la receta.</p>;

  return (
    <main className="receta">
      <button onClick={() => nav(-1)} className="receta__back-btn">
        ← Volver
      </button>

      <section className="receta__detail">
        

        <div className="receta__info">
          <h1 className="receta__title">{receta.titulo}</h1>
          <div className="receta__img-wrapper">
          {receta.imagen ? (
            <img src={receta.imagen} alt={receta.titulo} className="receta__img" />
          ) : (
            <div className="receta__placeholder">Sin imagen</div>
          )}
        </div>
          {receta.descripcion && (
            <p className="receta__desc">{receta.descripcion}</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default RecetaPage;
