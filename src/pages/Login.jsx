import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoGimnasio from '../assets/fondo-azul.jpg';
import logoGym from '../assets/logo-pesas.png';
import '../Login.css';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/inicio');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-brand">
        <div
          className="login-brand-bg"
          style={{ backgroundImage: `url(${fondoGimnasio})` }}
        />
        <img className="login-logo" src={logoGym} alt="Fitness Center" />
      </div>

      <div className="login-side">
        <div className="login-card">
          <header className="login-header">
            <p className="login-gym">ALPHA FITNESS GYM</p>
            <p className="login-sub">FITNESS CENTER</p>
            <h1 className="login-title">Iniciar sesión</h1>
          </header>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label" htmlFor="username">Usuario</label>
            <div className="login-field">
              <UserIcon />
              <input
                id="username"
                className="login-input"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <label className="login-label" htmlFor="password">Contraseña</label>
            <div className="login-field">
              <LockIcon />
              <input
                id="password"
                className="login-input"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="login-error">{error}</p>}

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;