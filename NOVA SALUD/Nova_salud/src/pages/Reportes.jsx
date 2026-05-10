import { useState } from 'react';
import './Reportes.css';

function Reportes({ searchTerm }) {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("mes");

  const exportarPDF = () => {
    alert(" Generando reporte en PDF...\n\n(Simulación - En un proyecto real se generaría un archivo PDF)");
    
  };

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <h2>Reportes y Estadísticas</h2>
        <button className="btn-export" onClick={exportarPDF}>
        Exportar PDF
        </button>
      </div>

      <div className="reportes-metrics">
        <div className="r-metric">
          <p>Ventas del Mes</p>
          <h3>S/ 0.00</h3>
        </div>
        <div className="r-metric">
          <p>Total Productos Vendidos</p>
          <h3>0</h3>
        </div>
        <div className="r-metric">
          <p>Producto Más Vendido</p>
          <h3>—</h3>
        </div>
        <div className="r-metric">
          <p>Ticket Promedio</p>
          <h3>S/ 0.00</h3>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Ventas por Período</h3>
          <select 
            className="period-select"
            value={periodoSeleccionado}
            onChange={(e) => setPeriodoSeleccionado(e.target.value)}
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mes</option>
            <option value="año">Este Año</option>
          </select>
        </div>

        <div className="reporte-periodo">
          <h4>
            {periodoSeleccionado === "semana" && "Ventas de esta Semana"}
            {periodoSeleccionado === "mes" && "Ventas de este Mes"}
            {periodoSeleccionado === "año" && "Ventas de este Año"}
          </h4>
          
          <div className="empty-reporte">
            <p>Aún no hay suficientes datos</p>
            <small>Registra ventas en "Punto de Venta" para ver estadísticas aquí</small>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Productos Más Vendidos</h3>
        </div>
        <div className="empty-reporte">
          <p> Aún no hay productos vendidos</p>
          <small>Las ventas aparecerán aquí cuando registres transacciones</small>
        </div>
      </div>
    </div>
  );
}

export default Reportes;