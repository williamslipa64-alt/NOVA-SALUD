import { useState } from 'react';
import './Ventas.css';

function Ventas({ searchTerm = "" }) {
  const [ventas, setVentas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaVenta, setNuevaVenta] = useState({
    numero_boleta: '',
    cliente: '',
    total: '',
    metodo_pago: 'Efectivo'
  });

  const abrirModal = () => {
    setNuevaVenta({
      numero_boleta: `B${Date.now().toString().slice(-6)}`,
      cliente: '',
      total: '',
      metodo_pago: 'Efectivo'
    });
    setMostrarModal(true);
  };

  const registrarVenta = () => {
    if (!nuevaVenta.cliente || !nuevaVenta.total) {
      alert("Por favor completa Cliente y Total");
      return;
    }

    const venta = {
      id: Date.now(),
      ...nuevaVenta,
      fecha: new Date().toLocaleDateString('es-PE'),
      total: parseFloat(nuevaVenta.total)
    };

    setVentas([venta, ...ventas]);
    setMostrarModal(false);
    alert("¡Venta registrada correctamente!");
  };

  const exportarVentas = () => {
    if (ventas.length === 0) {
      alert("No hay ventas para exportar");
      return;
    }
    alert("Exportando ventas a CSV... (Simulación)");
  };

  const ventasFiltradas = ventas.filter(venta =>
    venta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venta.numero_boleta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venta.metodo_pago.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ventas-container">
      <div className="ventas-header">
        <h2>Historial de Ventas</h2>
        <button className="btn-nueva-venta" onClick={abrirModal}>
          + Nueva Venta
        </button>
      </div>

      <div className="ventas-metrics">
        <div className="v-metric">
          <p>Ventas Hoy</p>
          <h3>{ventas.length}</h3>
          <small>S/ {ventas.reduce((sum, v) => sum + v.total, 0).toFixed(2)}</small>
        </div>
        <div className="v-metric">
          <p>Ventas Totales</p>
          <h3>{ventas.length}</h3>
        </div>
        <div className="v-metric">
          <p>Total Ingresos</p>
          <h3>S/ {ventas.reduce((sum, v) => sum + v.total, 0).toFixed(2)}</h3>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Registro de Ventas ({ventasFiltradas.length})</h3>
          <button className="btn-export" onClick={exportarVentas}>
            Exportar
          </button>
        </div>

        {ventas.length === 0 ? (
          <div className="empty-ventas">
            <p>No hay ventas registradas todavía</p>
            <small>Haz clic en "+ Nueva Venta" para registrar la primera</small>
          </div>
        ) : (
          <table className="ventas-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>N° Boleta</th>
                <th>Cliente</th>
                <th>Método</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map(venta => (
                <tr key={venta.id}>
                  <td>{venta.fecha}</td>
                  <td>{venta.numero_boleta}</td>
                  <td>{venta.cliente}</td>
                  <td>{venta.metodo_pago}</td>
                  <td><strong>S/ {venta.total.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nueva Venta</h3>
            
            <label>N° Boleta</label>
            <input type="text" value={nuevaVenta.numero_boleta} readOnly />

            <label>Cliente</label>
            <input 
              type="text" 
              placeholder="Nombre del cliente"
              value={nuevaVenta.cliente}
              onChange={(e) => setNuevaVenta({...nuevaVenta, cliente: e.target.value})}
            />

            <label>Total (S/)</label>
            <input 
              type="number" 
              placeholder="0.00"
              value={nuevaVenta.total}
              onChange={(e) => setNuevaVenta({...nuevaVenta, total: e.target.value})}
            />

            <label>Método de Pago</label>
            <select 
              value={nuevaVenta.metodo_pago}
              onChange={(e) => setNuevaVenta({...nuevaVenta, metodo_pago: e.target.value})}
            >
              <option>Efectivo</option>
              <option>Tarjeta</option>
              <option>Yape</option>
              <option>Transferencia</option>
            </select>

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={registrarVenta}>
                Registrar Venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ventas;