import { useState, useEffect } from 'react';
import './App.css';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';
import Clientes from './pages/clientes/Clientes';
import Alertas from './pages/Alertas';
import Reportes from './pages/Reportes';
import Perfil from './pages/Perfil';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [paginaActual, setPaginaActual] = useState('pos');
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));
  }, []);

  const handleLogin = (userData) => {
    setUsuario(userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    setMostrarPerfil(false);
    setSearchTerm("");
  };

  const handleUpdateUser = (updatedUser) => {
    setUsuario(updatedUser);
    localStorage.setItem('usuario', JSON.stringify(updatedUser));
    setMostrarPerfil(false);
  };

  if (!usuario) return <Login onLogin={handleLogin} />;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'pos', label: 'Punto de Venta'},
    { id: 'inventario', label: 'Inventario'},
    { id: 'ventas', label: 'Historial Ventas'},
    { id: 'clientes', label: 'Clientes' },
    { id: 'alertas', label: 'Alertas' },
    { id: 'reportes', label: 'Reportes' },
  ];

  const renderPagina = () => {
    const propsComunes = { searchTerm };

    if (mostrarPerfil) {
      return <Perfil usuario={usuario} onUpdateUser={handleUpdateUser} onClose={() => setMostrarPerfil(false)} />;
    }

    switch (paginaActual) {
      case 'dashboard': return <Dashboard />;
      case 'pos': return <POS {...propsComunes} />;
      case 'inventario': return <Inventario {...propsComunes} />;
      case 'ventas': return <Ventas {...propsComunes} />;
      case 'clientes': return <Clientes {...propsComunes} />;
      case 'alertas': return <Alertas />;
      case 'reportes': return <Reportes />;
      default: return <POS {...propsComunes} />;
    }
  };

  const paginasConBuscador = ['pos', 'inventario', 'ventas', 'clientes'];

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <h1>Nova Salud</h1>
          <p>Sistema de Gestión</p>
        </div>

        <nav className="nav-menu">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${paginaActual === item.id && !mostrarPerfil ? 'active' : ''}`}
              onClick={() => {
                setPaginaActual(item.id);
                setMostrarPerfil(false);
                setSearchTerm(""); 
              }}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        <div className="user-info" onClick={() => setMostrarPerfil(true)}>
          <div className="avatar">
            {usuario.foto ? <img src={usuario.foto} alt="perfil" /> : "AF"}
          </div>
          <div>
            <strong>{usuario.nombre} {usuario.apellido}</strong>
            <small>{usuario.rol || 'Administrador'}</small>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
      </div>

      <div className="main-content">
        <header className="topbar">
          <h2>
            {mostrarPerfil ? "Perfil de Usuario" : 
              menuItems.find(m => m.id === paginaActual)?.label}
          </h2>
          
          {paginasConBuscador.includes(paginaActual) && (
            <input 
              type="text" 
              placeholder="Buscar producto o cliente..." 
              className="search-bar" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </header>

        <div className="page-content">
          {renderPagina()}
        </div>
      </div>
    </div>
  );
}

export default App;