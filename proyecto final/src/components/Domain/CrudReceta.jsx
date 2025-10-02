import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';
import '../../styles/Crud.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CrudReceta({ reloadKey }) {
    const [recetas, setRecetas] = useState([]);
// Carga las recetas al montar el componente o cuando reloadKey cambie
    useEffect(() => {
        async function traerRecetas() {
            try {
                const peticion = await fetch(`http://localhost:3001/recetas`);
                const datos = await peticion.json();
                setRecetas(datos);
            } catch (error) {
                console.error("Error al traer recetas:", error);
            }
        }
        traerRecetas();
    }, [reloadKey]);
// Elimina una receta por ID
    const eliminarReceta = async (id) => {
        try {
            if (!window.confirm('¿Seguro que deseas eliminar esta receta?')) return;
            const ok = await Services.eliminateDatos("recetas", id);
            if (ok) setRecetas(prev => prev.filter(r => r.id !== id));
        } catch (e) {
            console.error('Error al eliminar receta:', e);
            alert('No se pudo eliminar la receta. Revisa la consola.');
        }
    };
// Edita una receta por ID
    const editarReceta = async (id) => {
        const actual = recetas.find(r => r.id === id);
        if (!actual) return;
        // Pedimos cada campo con prompt 
        const nuevoTitulo = prompt('Título:', actual.titulo ?? '');
        if (nuevoTitulo === null) return;
        const nuevaDescripcion = prompt('Descripción:', actual.descripcion ?? '');
        if (nuevaDescripcion === null) return;
        const nuevaImagen = prompt('URL imagen (https://...):', actual.imagen ?? '');
        if (nuevaImagen === null) return;

        // Validación mínima
        if (!nuevoTitulo.trim()) {
            alert('El título no puede quedar vacío.');
            return;
        }

        const body = {
            titulo: nuevoTitulo.trim(),
            descripcion: nuevaDescripcion.trim(),
            imagen: nuevaImagen.trim()
        };
        // Actualiza el estado localmente para una respuesta más rápida
        const prev = recetas.slice();
        setRecetas(prev.map(r => (r.id === id ? { ...r, ...body } : r)));

        // Luego intenta guardar en el servidor
        try {
            await Services.putDatos("recetas", id, body);
        } catch (err) {
            console.error('Error al editar receta:', err);
            alert('No se pudo guardar la edición. Revirtiendo cambios.');
            setRecetas(prev);
        }
    };
    // Ordena las recetas alfabéticamente por título
    const recetasOrdenadas = [...recetas].sort((a, b) => {
        const A = (a.titulo || '').toLowerCase();
        const B = (b.titulo || '').toLowerCase();
        return A.localeCompare(B);
    });

    return (
        <div className='formulario-crud'>
            <div className='lista-crud'>
                <h2 className='titulo-crud'>Recetas</h2>

                {recetasOrdenadas.length === 0 ? (
                    <p className='sin-elementos'>No hay recetas aún.</p>
                ) : (
                    <ul className='lista-items'>
                        {recetasOrdenadas.map(r => (
                            <li key={r.id} className='item-crud'>
                                <div className='item-contenido'>
                                    <div className='item-texto'>
                                        <strong className='item-nombre'>{r.titulo}</strong>
                                        <div className='item-pequeno'>
                                            {r.descripcion && <span className='descripcion'>{r.descripcion}</span>}
                                        </div>
                                    </div>
                                    {r.imagen && (
                                        <div className='item-imagen'>
                                            <img src={r.imagen} alt={r.titulo} onError={(e) => e.currentTarget.style.display = 'none'} />
                                        </div>
                                    )}
                                </div>
                                <div className='botones-crud'>
                                    <button onClick={() => eliminarReceta(r.id)}
                                        className='btnEliminar' title='Eliminar'>
                                        <DeleteIcon /> </button>
                                    <button onClick={() => editarReceta(r.id)}
                                        className='btnEditar' title='Editar'>
                                        <EditIcon /> </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CrudReceta;
