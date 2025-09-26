import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Services from '../../services/Services';
import '../../styles/Login.css';

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
    const pass = contra.trim();

    if (!correo || !pass) {
      setError('Completa email y contraseña.');
      return;
    }

    // (Opcional) validación de formato de email para evitar búsquedas inútiles
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(correo)) {
      setError('Email o contraseña incorrectos.');
      return;
    }

    try {
      setCargando(true);

      // Intenta filtrar por email Y contraseña en el servidor (match exacto)
      const endpoint = `usuarios?email=${encodeURIComponent(correo)}&contra=${encodeURIComponent(pass)}&_limit=5`;
      let lista = await Services.getDatos(endpoint);

      // Filtramos en cliente
      if (!Array.isArray(lista)) lista = [];
      const user =
        lista.find(u => u?.email === correo && u?.contra === pass) || null;

      if (!user) {
        setError('Email o contraseña incorrectos.');
        return;
      }

      // Guardar sesión
      const rol = user.rol || 'user';
      localStorage.setItem(
        'authUser',
        JSON.stringify({
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol,
        })
      );

      // Redirección por rol (tu DB ya trae rol:"admin" para laguaria@gmail.com)
      navigate(rol === 'admin' ? '/admin' : '/', { replace: true });
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
