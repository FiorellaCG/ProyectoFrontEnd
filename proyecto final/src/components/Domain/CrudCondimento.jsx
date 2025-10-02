import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';
import '../../styles/Crud.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CrudCondimento({ reloadKey }) {
    const [condimentos, setCondimentos] = useState([]);

    useEffect(() => {
        async function traerCondimentos() {
            // Trae los condimentos desde la API
            const peticion = await fetch(`http://localhost:3001/condimentos`)
            const datos = await peticion.json()
            setCondimentos(datos)
        }
        traerCondimentos()
    }, [])

    // Elimina un condimento por ID
    const eliminarCondimento = async (id) => {
        try {
            // Confirma la eliminación
            if (!window.confirm('¿Seguro que deseas eliminar este condimento?')) return;
            const ok = await Services.eliminateDatos("condimentos", id);
            if (ok) setCondimentos(prev => prev.filter(c => c.id !== id));
            // Aquí puedes manejar la respuesta de la API si es necesario
        } catch (e) {
            console.error('Error al eliminar condimento:', e);
            alert('No se pudo eliminar el condimento. Revisa la consola.');
        }
    }

    const editarCondimento = async (id) => {
        // Busca el condimento actual
        const actual = condimentos.find(c => c.id === id);
        if (!actual) return;

        // Pedimos cada campo con prompt (puedes cambiarlos por un formulario/modal)
        const nuevoNombre = prompt('Nombre:', actual.nombre ?? '');
        if (nuevoNombre === null) return; // el usuario canceló
        const nuevosBeneficios = prompt('Beneficios:', actual.beneficios ?? '');
        if (nuevosBeneficios === null) return;
        const nuevoOrigen = prompt('Origen (Ej: India, Caribe):', actual.origen ?? '');
        if (nuevoOrigen === null) return;
        const nuevaImagen = prompt('URL imagen (https://...):', actual.imagen ?? '');
        if (nuevaImagen === null) return;

        // Validación mínima
        if (!nuevoNombre.trim()) {
            alert('El nombre no puede quedar vacío.');
            return;
        }
        // Construye el cuerpo de la actualización
        const body = {
            nombre: nuevoNombre.trim(),
            beneficios: nuevosBeneficios.trim(),
            origen: nuevoOrigen.trim(),
            imagen: nuevaImagen.trim()
        };

        // Actualización optimista en UI
        const prev = condimentos.slice();
        setCondimentos(prev.map(c => (c.id === id ? { ...c, ...body } : c)));

        try {
            await Services.putDatos("condimentos", id, body);
        } catch (err) {
            console.error('Error al editar condimento:', err);
            alert('No se pudo guardar la edición. Revirtiendo cambios.');
            setCondimentos(prev); // revertir
        }
    };

    // Ordena por nombre (opcional)
    const condOrdenados = [...condimentos].sort((a, b) => {
        const A = (a.nombre || '').toLowerCase();
        const B = (b.nombre || '').toLowerCase();
        return A.localeCompare(B);
    });

    return (
        <div className='formulario-crud'>
            <div className='lista-crud'>
                <h2 className='titulo-crud'>Condimentos</h2>

                {condOrdenados.length === 0 ? (
                    <p className='sin-elementos'>No hay condimentos aún.</p>
                ) : (
                    <ul className='lista-items'>
                        {condOrdenados.map(c => (
                            <li key={c.id} className='item-crud'>
                                <div className='item-contenido'>
                                    <div className='item-texto'>
                                        <strong className='item-nombre'>{c.nombre}</strong>
                                        <div className='item-pequeno'>
                                            <span>{c.origen ? `Origen: ${c.origen}` : 'Origen: —'}</span>
                                            {c.beneficios && <span className='beneficios'> • {c.beneficios}</span>}
                                        </div>
                                    </div>

                                    {/* Si tiene imagen mostramos un thumbnail pequeño */}
                                    {c.imagen && (
                                        <div className='item-imagen'>
                                            <img src={c.imagen} alt={c.nombre} onError={(e) => e.currentTarget.style.display = 'none'} />
                                        </div>
                                    )}
                                </div>
                                <div className='botones-crud'>
                                    <button onClick={() => eliminarCondimento(c.id)}
                                        className='btnEliminar' title='Eliminar'>
                                        <DeleteIcon /> </button>
                                    <button onClick={() => editarCondimento(c.id)}
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

export default CrudCondimento;
