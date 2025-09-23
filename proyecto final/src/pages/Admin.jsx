import React, { useState } from 'react';
import AdminIngreso from '../components/Domain/AdminIngreso';
import '../styles/Admin.css';

function Admin() {
  const [tipo, setTipo] = useState(null); // null = no se eligió nada aún

  return (
    <div className="admin-page">
      <h2 className="admin-title">Panel de Administración</h2>

      {/* Botones de selección */}
      <div className="admin-buttons">
        <button className="btn-option" onClick={() => setTipo('condimentos')}>
          Administrar Condimentos
        </button>
        <button className="btn-option" onClick={() => setTipo('recetas')}>
          Administrar Recetas
        </button>
      </div>

      {/* Render condicional del registro */}
      {tipo && (
        <div className="admin-content">
          <AdminIngreso tipo={tipo} />
        </div>
      )}
    </div>
  );
}

export default Admin;

