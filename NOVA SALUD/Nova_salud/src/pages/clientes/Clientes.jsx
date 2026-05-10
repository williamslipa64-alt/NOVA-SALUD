import { useState } from 'react';
import './Clientes.css';

function Clientes({ searchTerm = "" }) {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    email: ''
  });

  const abrirModal = () => {
    setNuevoCliente({ nombre: '', dni: '', telefono: '', email: '' });
    setMostrarModal(true);
  };

  const registrarCliente = () => {
    if (!nuevoCliente.nombre) {
      alert("El nombre del cliente es obligatorio");
      return;
    }

    const cliente = {
      id: Date.now(),
      ...nuevoCliente,
      ultima_compra: "—",
      total_gastado: 0.00,
      fecha_registro: new Date().toLocaleDateString('es-PE')
    };

    setClientes([cliente, ...clientes]);
    setMostrarModal(false);
    alert("Cliente registrado correctamente");
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cliente.dni && cliente.dni.includes(searchTerm)) ||
    (cliente.telefono && cliente.telefono.includes(searchTerm))
  );

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h2>Gestión de Clientes</h2>
        <button className="btn-nuevo-cliente" onClick={abrirModal}>
          + Nuevo Cliente
        </button>
      </div>

      <div className="clientes-metrics">
        <div className="c-metric">
          <p>Total Clientes</p>
          <h3>{clientes.length}</h3>
        </div>
        <div className="c-metric">
          <p>Clientes Frecuentes</p>
          <h3>0</h3>
        </div>
        <div className="c-metric">
          <p>Cliente con más compras</p>
          <h3>—</h3>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Lista de Clientes ({clientesFiltrados.length})</h3>
        </div>

        {clientes.length === 0 ? (
          <div className="empty-clientes">
            <p> Aún no hay clientes registrados</p>
            <small>Haz clic en "+ Nuevo Cliente" para agregar el primero</small>
          </div>
        ) : (
          <table className="clientes-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Última Compra</th>
                <th>Total Gastado</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map(cliente => (
                <tr key={cliente.id}>
                  <td><strong>{cliente.nombre}</strong></td>
                  <td>{cliente.dni || '—'}</td>
                  <td>{cliente.telefono || '—'}</td>
                  <td>{cliente.email || '—'}</td>
                  <td>{cliente.ultima_compra}</td>
                  <td>S/ {cliente.total_gastado.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nuevo Cliente</h3>

            <label>Nombre Completo *</label>
            <input 
              type="text" 
              placeholder="Nombre del cliente"
              value={nuevoCliente.nombre}
              onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
            />

            <label>DNI / Documento *</label>
            <input 
              type="text" 
              placeholder="12345678"
              value={nuevoCliente.dni}
              onChange={(e) => setNuevoCliente({...nuevoCliente, dni: e.target.value})}
            />

            <label>Teléfono</label>
            <input 
              type="tel" 
              placeholder="987 654 321"
              value={nuevoCliente.telefono}
              onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
            />

            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="cliente@email.com"
              value={nuevoCliente.email}
              onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})}
            />

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={registrarCliente}>
                Registrar Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;  