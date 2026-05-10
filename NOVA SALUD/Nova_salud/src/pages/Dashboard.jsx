import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard - Nova Salud</h2>

      <div className="metrics-grid">
        <div className="metric-card">
          <p className="metric-label">Ventas Hoy</p>
          <h3 className="metric-value">S/ 0.00</h3>
          <p className="metric-sub">0 ventas • Sin registros</p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Productos en Stock</p>
          <h3 className="metric-value">0</h3>
          <p className="metric-sub">Sin productos registrados</p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Clientes Atendidos</p>
          <h3 className="metric-value">0</h3>
          <p className="metric-sub">Hoy</p>
        </div>

        <div className="metric-card">
          <p className="metric-label">Alertas Activas</p>
          <h3 className="metric-value danger">0</h3>
          <p className="metric-sub">Sin alertas críticas</p>
        </div>
      </div>

      <div className="row-two">
        <div className="card">
          <div className="card-header">
            <h3> Alertas de Reposición</h3>
          </div>
          <div className="empty-state">
            <p>Todo está bien por ahora</p>
            <small>No hay productos con stock bajo</small>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3> Ventas Recientes</h3>
          </div>
          <div className="empty-state">
            <p>Aún no hay ventas registradas</p>
            <small>Las ventas aparecerán aquí</small>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3> Ventas esta semana</h3>
        </div>
        <div className="chart-placeholder">
          <p>Cuando registres ventas, aquí verás un gráfico semanal</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;