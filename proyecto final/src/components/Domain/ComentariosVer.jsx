import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';
import '../../styles/ComentariosVer.css'

function ComentariosVer() {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const data = await Services.getDatos('comentarios');
                setComentarios(data);
            } catch (error) {
                console.error('Error al cargar comentarios:', error);
            }
        };

        fetchComentarios();
    }, []);

    return (
        <div>
            <h2 className='comments-title'>Comentarios Recientes</h2>
            {comentarios.length === 0 ? (
                <p>No hay comentarios aún.</p>
            ) : (
                <ul className="comentarios-lista">
                    {comentarios.map((comentario, index) => (
                        <li key={index} className="comentario-item">
                            <p><strong>Autor:</strong> {comentario.autor || 'Anónimo'}</p>
                            <h3>{comentario.titulo}</h3>
                            <p>{comentario.descripcion}</p>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ComentariosVer;