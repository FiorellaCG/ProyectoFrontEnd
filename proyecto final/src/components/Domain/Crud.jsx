import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';

function Crud({ reloadKey }) {
  const [condimentos, setCondimentos] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtain data: first try specific endpoints, fallback to a generic getDatos()
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Intenta llamadas específicas (mejor práctica si existen)
        const [condResp, recResp] = await Promise.allSettled([
          Services.getCondimentos?.() ?? Promise.reject('no getCondimentos'),
          Services.getRecetas?.() ?? Promise.reject('no getRecetas')
        ]);

        if (mounted) {
          if (condResp.status === 'fulfilled') setCondimentos(condResp.value);
          if (recResp.status === 'fulfilled') setRecetas(recResp.value);

          // Si no existen los métodos anteriores, intenta getDatos()
          if (condResp.status !== 'fulfilled' || recResp.status !== 'fulfilled') {
            const datos = await Services.getDatos();
            // Asume que getDatos devuelve { condimentos: [...], recetas: [...] } o un array
            if (datos) {
              if (Array.isArray(datos)) {
                // si getDatos devuelve solo condimentos
                setCondimentos(datos);
              } else {
                if (datos.condimentos) setCondimentos(datos.condimentos);
                if (datos.recetas) setRecetas(datos.recetas);
              }
            }
          }
        }
      } catch (err) {
        if (mounted) setError('Error al obtener datos: ' + (err?.message ?? err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => { mounted = false; };
  }, [reloadKey]);

  // ----- ELIMINAR -----
  const eliminarCondimento = async (id) => {
    if (!window.confirm('¿Eliminar este condimento?')) return;
    try {
      const ok = await Services.deleteCondimento?.(id) ?? await Services.eliminateDatos?.(id);
      if (ok) setCondimentos(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      console.error('Error al eliminar condimento:', e);
      alert('No se pudo eliminar el condimento.');
    }
  };

  const eliminarReceta = async (id) => {
    if (!window.confirm('¿Eliminar esta receta?')) return;
    try {
      const ok = await Services.deleteReceta?.(id) ?? await Services.eliminateDatos?.(id);
      if (ok) setRecetas(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      console.error('Error al eliminar receta:', e);
      alert('No se pudo eliminar la receta.');
    }
  };

  // ----- ACTUALIZAR -----
  const actualizarCondimento = async (id) => {
    const item = condimentos.find(c => c.id === id);
    if (!item) return;
    // ejemplo: solo editamos nombre; puedes ampliar campos
    const nuevoNombre = prompt('Nuevo nombre del condimento:', item.nombre ?? item.name ?? '');
    if (nuevoNombre === null) return; // cancel
    const datosActualizados = { ...item, nombre: nuevoNombre.trim() };
    if (!datosActualizados.nombre) return alert('Nombre inválido.');

    try {
      const updated = await Services.updateCondimento?.(id, datosActualizados) ?? await Services.putTareas?.(id, datosActualizados);
      // si la API devuelve el objeto actualizado úsalo, si no, actualiza en cliente
      setCondimentos(prev => prev.map(c => (c.id === id ? (updated ?? datosActualizados) : c)));
    } catch (e) {
      console.error('Error al actualizar condimento:', e);
      alert('No se pudo actualizar el condimento.');
    }
  };

  const actualizarReceta = async (id) => {
    const item = recetas.find(r => r.id === id);
    if (!item) return;
    const nuevoNombre = prompt('Nuevo nombre de la receta:', item.nombre ?? item.title ?? '');
    if (nuevoNombre === null) return;
    const datosActualizados = { ...item, nombre: nuevoNombre.trim() };
    if (!datosActualizados.nombre) return alert('Nombre inválido.');

    try {
      const updated = await Services.updateReceta?.(id, datosActualizados) ?? await Services.putTareas?.(id, datosActualizados);
      setRecetas(prev => prev.map(r => (r.id === id ? (updated ?? datosActualizados) : r)));
    } catch (e) {
      console.error('Error al actualizar receta:', e);
      alert('No se pudo actualizar la receta.');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="crud-container">
      <section className="lista-condimentos">
        <h2>Condimentos</h2>
        {condimentos.length === 0 ? <p>No hay condimentos.</p> : (
          <ul>
            {condimentos.map(c => (
              <li key={c.id} className="item">
                <div className="item-text">
                  <strong>{c.nombre ?? c.name}</strong>
                  {c.descripcion && <div className="small">{c.descripcion}</div>}
                </div>
                <div className="botones">
                  <button onClick={() => actualizarCondimento(c.id)} className="btnEditar">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => eliminarCondimento(c.id)} className="btnEliminar">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="lista-recetas" style={{ marginTop: 20 }}>
        <h2>Recetas</h2>
        {recetas.length === 0 ? <p>No hay recetas.</p> : (
          <ul>
            {recetas.map(r => (
              <li key={r.id} className="item">
                <div className="item-text">
                  <strong>{r.nombre ?? r.title}</strong>
                  {r.descripcion && <div className="small">{r.descripcion}</div>}
                </div>
                <div className="botones">
                  <button onClick={() => actualizarReceta(r.id)} className="btnEditar">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => eliminarReceta(r.id)} className="btnEliminar">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Crud;
