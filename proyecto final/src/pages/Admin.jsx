import React, { useState } from 'react';
import AdminIngreso from '../components/Domain/AdminIngreso';
import '../styles/Admin.css';
import CondimentoCarrusel from '../components/Domain/CondimentoCarrusel';
import Condimentos from './Condimentos';

function Admin() {
  const [tipo, setTipo] = useState(null); // null = no se eligió nada aún

  return (
    <div className="admin-page">
      <h2 className="admin-title">Panel de Administración</h2>

      <div className="admin-buttons">
        <button className="btn-option" onClick={() => setTipo('condimentos')}>
          Administrar Condimentos
        </button>
        <button className="btn-option" onClick={() => setTipo('recetas')}>
          Administrar Recetas
        </button>
      </div>
      {tipo && (
        <div className="admin-content">
          <AdminIngreso tipo={tipo} />
        </div>
      )}
      <br />
     


    </div>
  );
}

export default Admin;

