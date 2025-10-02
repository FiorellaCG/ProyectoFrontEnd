import React, { useState } from 'react';
import CondimentoInfo from './CondimentoInfo';
import RecetaInfo from './RecetaInfo';
import CrudCondimento from './CrudCondimento';
import CrudReceta from './CrudReceta';

function AdminIngreso({ tipo }) {
  // reloadKey sirve para refrescar la lista cuando se agrega un nuevo registro
  const [reloadKey, setReloadKey] = useState(0);

  // Esta función la pasamos al formulario para que lo llame después de guardar
  const handleSaved = () => {
    setReloadKey(prev => prev + 1);
  };

  return (
    <div className="register-card">
      {/* Mostrar formulario de acuerdo al tipo */}
      {tipo === 'condimentos' && (
        <>
          <CondimentoInfo onSaved={handleSaved} />
          <CrudCondimento onSaved={reloadKey}/>
        </>
      )}

      {tipo === 'recetas' && (
        <>
          <RecetaInfo onSaved={handleSaved} />
          <CrudReceta reloadKey={reloadKey} />
        </>
      )}
    </div>
  );
}

export default AdminIngreso;
