import { useState } from 'react';
import './Alertas.css';

function Alertas() {
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [config, setConfig] = useState({
    stockMinimoDefecto: 10,
    umbralBajoStock: 5,
    diasAntesVencimiento: 30
  });

  const guardarConfiguracion = () => {
    alert(" Configuración de umbrales guardada correctamente");
    setMostrarConfig(false);
  };

  return (
    <div className="alertas-container">
      <div className="alertas-header">
        <h2>Centro de Alertas</h2>
        <button className="btn-config" onClick={() => setMostrarConfig(true)}>
          Configurar Umbrales
        </button>
      </div>

      <div className="alertas-metrics">
        <div className="alert-metric critical">
          <p>Alertas Críticas</p>
          <h3>0</h3>
          <small>Stock por debajo del mínimo</small>
        </div>
        <div className="alert-metric warning">
          <p>Bajo Stock</p>
          <h3>0</h3>
          <small>Cerca del límite</small>
        </div>
        <div className="alert-metric">
          <p>Próximos a Vencer</p>
          <h3>0</h3>
          <small>En los próximos 30 días</small>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Productos con Alertas Activas</h3>
        </div>
        <div className="empty-alertas">
          <p> No hay alertas en este momento</p>
          <small>Cuando un producto tenga stock bajo o esté próximo a vencer aparecerá aquí</small>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Productos Próximos a Vencer</h3>
        </div>
        <div className="empty-alertas">
          <p> No hay productos próximos a vencer</p>
        </div>
      </div>

      {mostrarConfig && (
        <div className="modal">
          <div className="modal-content">
            <h3> Configurar Umbrales de Alertas</h3>
            
            <div className="form-group">
              <label>Stock Mínimo por Defecto</label>
              <input 
                type="number" 
                value={config.stockMinimoDefecto}
                onChange={(e) => setConfig({...config, stockMinimoDefecto: parseInt(e.target.value)})}
              />
              <small>Stock mínimo que se aplicará a nuevos productos</small>
            </div>

            <div className="form-group">
              <label>Umbral de Alerta Crítica</label>
              <input 
                type="number" 
                value={config.umbralBajoStock}
                onChange={(e) => setConfig({...config, umbralBajoStock: parseInt(e.target.value)})}
              />
              <small>Se considera alerta crítica cuando el stock está por debajo de este número</small>
            </div>

            <div className="form-group">
              <label>Días antes de Vencimiento</label>
              <input 
                type="number" 
                value={config.diasAntesVencimiento}
                onChange={(e) => setConfig({...config, diasAntesVencimiento: parseInt(e.target.value)})}
              />
              <small>Alertar cuando falten estos días o menos para vencer</small>
            </div>

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setMostrarConfig(false)}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={guardarConfiguracion}>
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alertas;