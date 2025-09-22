import { useState, useEffect } from 'react'
import { getDatos, postDatos } from '../../services/Services';

function RecetaInfo() {
  const [form, setForm] = useState({ titulo: "", ingredientes: "", pasos: "" });
  const [lista, setLista] = useState([]);

  useEffect(() => {
    getDatos("recetas").then(setLista);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postDatos("recetas", form);
    setForm({ titulo: "", ingredientes: "", pasos: "" });
    const datos = await getDatos("recetas");
    setLista(datos);
  };

  return (
    <div>
      <h2>Gestión de Recetas</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
        />
        <textarea
          name="ingredientes"
          placeholder="Ingredientes"
          value={form.ingredientes}
          onChange={handleChange}
        />
        <textarea
          name="pasos"
          placeholder="Pasos"
          value={form.pasos}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>

      <ul>
        {lista.map((r) => (
          <li key={r.id}>{r.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecetaInfo