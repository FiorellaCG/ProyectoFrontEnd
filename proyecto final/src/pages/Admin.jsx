import React from 'react'
import { useState } from 'react';
import CondimentoInfo from '../components/Domain/CondimentoInfo';
import RecetaInfo from '../components/Domain/RecetaInfo';

function Admin() {
  
    const [tab, setTab] = useState("condimentos");

  return (
    <div className="container">
      <h1>Administrador</h1>

      {/* Tabs de navegación */}
      <div className="tabs">
        <button onClick={() => setTab("condimentos")}>Condimentos</button>
        <button onClick={() => setTab("recetas")}>Recetas</button>
      </div>

      {/* Formulario Condimentos */}
      {tab === "condimentos" && <CondimentoInfo />}

      {/* Formulario Recetas */}
      {tab === "recetas" && <RecetaInfo />}
    </div>
  );
}

export default Admin