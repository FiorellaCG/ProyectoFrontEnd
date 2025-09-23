import React from 'react';
import CondimentoInfo from './CondimentoInfo';
import RecetaInfo from './RecetaInfo';

function AdminIngreso({ tipo }) {
  return (
    <div className="register-card">
      {tipo === 'condimentos' && <CondimentoInfo />}
      {tipo === 'recetas' && <RecetaInfo />}
    </div>
  );
}

export default AdminIngreso;


