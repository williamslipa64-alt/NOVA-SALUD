import { useState, useEffect } from "react";
import "./POS.css";

const API_URL = 'http://localhost:3500/api';

function POS({ searchTerm }) {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [cliente, setCliente] = useState({ nombre: "", apellido: "", dni: "" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Cargar productos desde el Backend
  const cargarProductos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/productos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProductosDisponibles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Filtrado con buscador global
  const productosFiltrados = productosDisponibles.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (producto.codigo_barra && producto.codigo_barra.includes(searchTerm))
  );

  const agregarProducto = (producto) => {
    const existe = productosAgregados.findIndex(item => item.id === producto.id);
    
    if (existe !== -1) {
      // Incrementar cantidad si ya existe
      const actualizados = [...productosAgregados];
      actualizados[existe].cantidad += 1;
      setProductosAgregados(actualizados);
    } else {
      setProductosAgregados([...productosAgregados, { ...producto, cantidad: 1 }]);
    }
  };

  const registrarVenta = () => {
    if (productosAgregados.length === 0) {
      alert("Agrega al menos un producto al carrito");
      return;
    }

    if (!cliente.dni) {
      setMostrarModalCliente(true);
      return;
    }

    const total = productosAgregados.reduce((sum, item) => sum + (item.precio_venta * item.cantidad), 0);

    alert(`✅ Venta registrada exitosamente!\n\nCliente: ${cliente.nombre || "Cliente General"} ${cliente.apellido}\nDNI: ${cliente.dni}\nMétodo: ${metodoPago}\nTotal: S/ ${total.toFixed(2)}\nProductos: ${productosAgregados.length}`);

    // Limpiar
    setProductosAgregados([]);
    setCliente({ nombre: "", apellido: "", dni: "" });
  };

  const seleccionarMetodo = (metodo) => setMetodoPago(metodo);

  return (
    <div className="pos-container">
      <section className="pos-left">
        <div className="pos-header">
          <h2>Punto de Venta</h2>
          <p>Gestiona tus ventas rápidamente</p>
        </div>

        <div className="productos-panel">
          <h3>Productos disponibles ({productosFiltrados.length})</h3>

          {loading ? (
            <p>Cargando productos...</p>
          ) : productosDisponibles.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h4>No hay productos registrados</h4>
              <p>Ve a <strong>Inventario</strong> para agregar productos</p>
            </div>
          ) : (
            <div className="productos-grid">
              {productosFiltrados.map((producto) => (
                <div key={producto.id} className="producto-card" onClick={() => agregarProducto(producto)}>
                  <h4>{producto.nombre}</h4>
                  <p>S/ {producto.precio_venta}</p>
                  <button className="btn-agregar">Agregar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <aside className="pos-right">
        <div className="carrito-header">
          <h3>Carrito de Venta</h3>
          <span>{productosAgregados.length} items</span>
        </div>

        <div className="carrito-items">
          {productosAgregados.length === 0 ? (
            <div className="empty-carrito">
              <div className="empty-icon">🛒</div>
              <h4>Carrito vacío</h4>
              <p>Selecciona productos para comenzar la venta</p>
            </div>
          ) : (
            <div>
              {productosAgregados.map((item, index) => (
                <div key={index} className="item-carrito">
                  {item.nombre} × {item.cantidad} - S/ {(item.precio_venta * item.cantidad).toFixed(2)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="total-section">
          <div className="total-row">
            <span>Total a Pagar</span>
            <strong>
              S/ {productosAgregados.reduce((sum, item) => sum + (item.precio_venta * item.cantidad), 0).toFixed(2)}
            </strong>
          </div>

          <div className="payment-methods">
            <button className={`metodo-btn ${metodoPago === 'Efectivo' ? 'active' : ''}`} onClick={() => seleccionarMetodo('Efectivo')}>Efectivo</button>
            <button className={`metodo-btn ${metodoPago === 'Tarjeta' ? 'active' : ''}`} onClick={() => seleccionarMetodo('Tarjeta')}>Tarjeta</button>
            <button className={`metodo-btn ${metodoPago === 'Yape' ? 'active' : ''}`} onClick={() => seleccionarMetodo('Yape')}>Yape</button>
          </div>

          <button className="btn-venta" onClick={registrarVenta}>
            Registrar Venta
          </button>
        </div>
      </aside>

      {mostrarModalCliente && (
        <div className="modal">
          <div className="modal-content">
            <h3>Datos del Cliente</h3>
            <p>DNI es obligatorio</p>

            <label>DNI <span style={{color:"red"}}>*</span></label>
            <input type="text" placeholder="12345678" value={cliente.dni} onChange={(e) => setCliente({...cliente, dni: e.target.value})} />

            <label>Nombre</label>
            <input type="text" placeholder="Nombre del cliente" value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} />

            <label>Apellido (Opcional)</label>
            <input type="text" placeholder="Apellido" value={cliente.apellido} onChange={(e) => setCliente({...cliente, apellido: e.target.value})} />

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setMostrarModalCliente(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={registrarVenta}>Confirmar Venta</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default POS;