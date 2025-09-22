import { useState, useEffect} from 'react'
import { getDatos, postDatos } from '../../services/Services';

function CondimentoInfo() {
  const [form, setForm] = useState({ nombre: "", origen: "", beneficios: "" });
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getDatos("condimentos").then(setLista);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postDatos("condimentos", form);
    setForm({ nombre: "", origen: "", beneficios: "" });
    const datos = await getDatos("condimentos");
    setLista(datos);
  };

  return (
    <div>
      <h2>Gestión de Condimentos</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          name="origen"
          placeholder="Origen"
          value={form.origen}
          onChange={handleChange}
        />
        <textarea
          name="beneficios"
          placeholder="Beneficios"
          value={form.beneficios}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>

      <ul>
        {lista.map((c) => (
          <li key={c.id}>{c.nombre} - {c.origen}</li>
        ))}
      </ul>
    </div>
  );
}

export default CondimentoInfo