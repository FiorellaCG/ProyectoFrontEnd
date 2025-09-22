import React from 'react'
import { getDatos, postDatos } from '../../services/Services';

function AdminDashboard() {
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
      {tab === "condimentos" && <CondimentosAdmin />}

      {/* Formulario Recetas */}
      {tab === "recetas" && <RecetasAdmin />}
    </div>
  );
}

export default AdminDashboard