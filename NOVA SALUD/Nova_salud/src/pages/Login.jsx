import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: ''
  });

  const API_URL = 'http://localhost:3500/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Error en el servidor');

      localStorage.setItem('token', data.token);
      onLogin(data.user || data);

      alert(isLogin ? "Inicio de sesión exitoso" : "Registro exitoso");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src="/src/assets/13.jpg" alt="Farmacia" />
          <div className="overlay">
            <h1>Nova Salud</h1>
            <p>Tu farmacia digital</p>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-box">
            <h2>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <input type="text" placeholder="Nombre *" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                  <input type="text" placeholder="Apellido" value={formData.apellido} onChange={(e) => setFormData({...formData, apellido: e.target.value})} />
                </>
              )}

              <input type="email" placeholder="Correo electrónico *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <input type="password" placeholder="Contraseña *" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
              </button>
            </form>

            <p className="toggle-text">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? " Regístrate" : " Inicia Sesión"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;