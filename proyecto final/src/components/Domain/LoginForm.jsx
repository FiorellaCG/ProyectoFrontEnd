import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Services from '../../services/Services';
import '../../styles/Login.css'   

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [contra, setContra] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const correo = email.trim();
    if (!correo || !contra) {
      setError('Completa email y contraseña.');
      return;
    }

    try {
      setCargando(true);

      // Busca por email exacto (regex ^correo$) y limita a 1
      const endpoint = `usuarios?email_like=${encodeURIComponent(`^${correo}$`)}&_limit=1`;
      const lista = await Services.getDatos(endpoint);
      const user = Array.isArray(lista) ? lista[0] : null;

      // Si no existe → ve a registro con prefill
      if (!user) {
        navigate('/register', { replace: true, state: { emailPrefill: correo } });
        return;
      }

      // Contraseña incorrecta
      if (user.contra !== contra) {
        setError('Contraseña incorrecta.');
        return;
      }

      // Éxito: guarda sesión simple
      localStorage.setItem('authUser', JSON.stringify({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol || 'user',
      }));

      // Si es admin según DB → /admin; si no → /
      if (user.rol === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar sesión. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Iniciar sesión</h2>

        <form className="form-grid" onSubmit={handleLogin}>
          <div className="form-field">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contra">Contraseña</label>
            <input
              id="contra"
              className="form-input"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={contra}
              onChange={(e) => setContra(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p style={{ color: '#b91c1c', fontSize: '14px', marginTop: 2 }}>
              {error}
            </p>
          )}

          <button className="btn-submit" type="submit" disabled={cargando}>
            {cargando ? 'Verificando…' : 'Entrar'}
          </button>

          <div style={{ textAlign: 'center', fontSize: 14, color: '#6b7280' }}>
            ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
