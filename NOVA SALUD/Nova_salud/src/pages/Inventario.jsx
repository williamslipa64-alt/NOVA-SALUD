import { useState, useEffect } from 'react';
import './Inventario.css';

const API_URL = 'http://localhost:3500/api';

function Inventario({ searchTerm = "" }) {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [loading, setLoading] = useState(false);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    codigo_barra: '',
    precio_compra: '',
    precio_venta: '',
    stock_actual: '',
    stock_minimo: '',
    categoria: '',
    fecha_vencimiento: ''
  });

  const [imagenPreview, setImagenPreview] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);

  const token = localStorage.getItem('token');

  // Cargar productos
  const cargarProductos = async () => {
    try {
      const res = await fetch(`${API_URL}/productos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando productos:", err);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo_barra?.includes(searchTerm)
  );

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const guardarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio_venta) {
      alert("Nombre y Precio de Venta son obligatorios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', nuevoProducto.nombre);
      formData.append('codigo_barra', nuevoProducto.codigo_barra || '');
      formData.append('precio_compra', nuevoProducto.precio_compra || 0);
      formData.append('precio_venta', nuevoProducto.precio_venta);
      formData.append('stock_actual', nuevoProducto.stock_actual || 0);
      formData.append('stock_minimo', nuevoProducto.stock_minimo || 10);
      formData.append('categoria', nuevoProducto.categoria || '');
      formData.append('fecha_vencimiento', nuevoProducto.fecha_vencimiento || '');

      if (imagenFile) formData.append('imagen', imagenFile);

      const url = productoAEditar 
        ? `${API_URL}/productos/${productoAEditar.id}` 
        : `${API_URL}/productos`;

      const res = await fetch(url, {
        method: productoAEditar ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        alert(productoAEditar ? "Producto actualizado correctamente" : "Producto guardado correctamente");
        setMostrarFormulario(false);
        setNuevoProducto({ nombre: '', codigo_barra: '', precio_compra: '', precio_venta: '', stock_actual: '', stock_minimo: '', categoria: '', fecha_vencimiento: '' });
        setImagenPreview(null);
        setImagenFile(null);
        cargarProductos();
      } else {
        alert("Error al guardar el producto");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const res = await fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        alert("Producto eliminado correctamente");
        cargarProductos();
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  const abrirFormulario = (producto = null) => {
    if (producto) {
      setProductoAEditar(producto);
      setNuevoProducto({
        nombre: producto.nombre,
        codigo_barra: producto.codigo_barra || '',
        precio_compra: producto.precio_compra || '',
        precio_venta: producto.precio_venta || '',
        stock_actual: producto.stock_actual || '',
        stock_minimo: producto.stock_minimo || '',
        categoria: producto.categoria || '',
        fecha_vencimiento: producto.fecha_vencimiento || ''
      });
      setImagenPreview(producto.imagen_url || null);
      setImagenFile(null);
    } else {
      setProductoAEditar(null);
      setNuevoProducto({ nombre: '', codigo_barra: '', precio_compra: '', precio_venta: '', stock_actual: '', stock_minimo: '', categoria: '', fecha_vencimiento: '' });
      setImagenPreview(null);
      setImagenFile(null);
    }
    setMostrarFormulario(true);
  };

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h2>Gestión de Inventario</h2>
        <button className="btn-nuevo" onClick={() => abrirFormulario()}>+ Nuevo Producto</button>
      </div>

      {mostrarFormulario && (
        <div className="formulario-producto">
          <h3>{productoAEditar ? "Editar Producto" : "Nuevo Producto"}</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Imagen del Producto</label>
              <input type="file" accept="image/*" onChange={handleImagenChange} />
              {imagenPreview && <img src={imagenPreview} alt="preview" className="imagen-preview" />}
            </div>

            <div className="form-group">
              <label>Nombre del Producto *</label>
              <input type="text" value={nuevoProducto.nombre} onChange={e => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Código de Barra</label>
              <input type="text" value={nuevoProducto.codigo_barra} onChange={e => setNuevoProducto({...nuevoProducto, codigo_barra: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Precio Compra (S/)</label>
              <input type="number" value={nuevoProducto.precio_compra} onChange={e => setNuevoProducto({...nuevoProducto, precio_compra: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Precio Venta (S/) *</label>
              <input type="number" value={nuevoProducto.precio_venta} onChange={e => setNuevoProducto({...nuevoProducto, precio_venta: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Stock Actual</label>
              <input type="number" value={nuevoProducto.stock_actual} onChange={e => setNuevoProducto({...nuevoProducto, stock_actual: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Stock Mínimo</label>
              <input type="number" value={nuevoProducto.stock_minimo} onChange={e => setNuevoProducto({...nuevoProducto, stock_minimo: e.target.value})} />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-cancelar" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            <button className="btn-guardar" onClick={guardarProducto}>
              {productoAEditar ? "Actualizar Producto" : "Guardar Producto"}
            </button>
          </div>
        </div>
      )}

      <div className="tabla-productos">
        <h3>Lista de Productos ({productosFiltrados.length})</h3>
        
        {productos.length === 0 ? (
          <div className="empty-inventario">
            <p>No hay productos registrados todavía</p>
            <small>Presiona "+ Nuevo Producto" para comenzar</small>
          </div>
        ) : (
          <table className="productos-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Precio Venta</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map(producto => (
                <tr key={producto.id}>
                  <td>
                    {producto.imagen_url ? <img src={producto.imagen_url} alt="" className="tabla-imagen" /> : "—"}
                  </td>
                  <td><strong>{producto.nombre}</strong></td>
                  <td>{producto.codigo_barra || '—'}</td>
                  <td>S/ {producto.precio_venta}</td>
                  <td className={producto.stock_actual <= (producto.stock_minimo || 10) ? 'stock-bajo' : ''}>
                    {producto.stock_actual} / {producto.stock_minimo || 10}
                  </td>
                  <td>
                    <button className="btn-editar" onClick={() => abrirFormulario(producto)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Inventario;