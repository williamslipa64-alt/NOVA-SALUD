import { useState } from 'react';
import './Inventario.css';

function Inventario({ searchTerm = "" }) {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    codigo_barra: '',
    precio_compra: '',
    precio_venta: '',
    stock_actual: '',
    stock_minimo: '',
    categoria: '',
    fecha_vencimiento: '',
    imagen: null
  });

  const [imagenPreview, setImagenPreview] = useState(null);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (producto.codigo_barra && producto.codigo_barra.includes(searchTerm))
  );

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoProducto({ ...nuevoProducto, imagen: file });
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const abrirFormulario = (producto = null) => {
    if (producto) {
      setProductoAEditar(producto);
      setNuevoProducto({
        nombre: producto.nombre,
        codigo_barra: producto.codigo_barra,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        stock_actual: producto.stock_actual,
        stock_minimo: producto.stock_minimo,
        categoria: producto.categoria || '',
        fecha_vencimiento: producto.fecha_vencimiento || '',
        imagen: null
      });
      setImagenPreview(producto.imagenPreview || null);
    } else {
      setProductoAEditar(null);
      setNuevoProducto({
        nombre: '', codigo_barra: '', precio_compra: '', precio_venta: '',
        stock_actual: '', stock_minimo: '', categoria: '', fecha_vencimiento: '', imagen: null
      });
      setImagenPreview(null);
    }
    setMostrarFormulario(true);
  };

  const guardarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio_venta) {
      alert("Nombre y Precio de Venta son obligatorios");
      return;
    }

    const productoGuardado = {
      id: productoAEditar ? productoAEditar.id : Date.now(),
      ...nuevoProducto,
      imagenPreview: imagenPreview,
      precio_venta: parseFloat(nuevoProducto.precio_venta) || 0,
      stock_actual: parseInt(nuevoProducto.stock_actual) || 0,
      stock_minimo: parseInt(nuevoProducto.stock_minimo) || 10,
    };

    if (productoAEditar) {
      setProductos(productos.map(p => p.id === productoAEditar.id ? productoGuardado : p));
      alert("Producto actualizado correctamente");
    } else {
      setProductos([productoGuardado, ...productos]);
      alert("Producto agregado correctamente");
    }

    setMostrarFormulario(false);
  };

  const eliminarProducto = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProductos(productos.filter(p => p.id !== id));
      alert("Producto eliminado correctamente");
    }
  };

  return (
    <div className="inventario-container">
      <div className="inventario-header">
        <h2>Gestión de Inventario</h2>
        <button className="btn-nuevo" onClick={() => abrirFormulario()}>
          + Nuevo Producto
        </button>
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
              <input type="text" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})} placeholder="Ej: Paracetamol 500mg" />
            </div>

            <div className="form-group">
              <label>Código de Barra</label>
              <input type="text" value={nuevoProducto.codigo_barra} onChange={(e) => setNuevoProducto({...nuevoProducto, codigo_barra: e.target.value})} placeholder="1234567890123" />
            </div>

            <div className="form-group">
              <label>Precio Compra (S/)</label>
              <input type="number" value={nuevoProducto.precio_compra} onChange={(e) => setNuevoProducto({...nuevoProducto, precio_compra: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Precio Venta (S/) *</label>
              <input type="number" value={nuevoProducto.precio_venta} onChange={(e) => setNuevoProducto({...nuevoProducto, precio_venta: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Stock Actual</label>
              <input type="number" value={nuevoProducto.stock_actual} onChange={(e) => setNuevoProducto({...nuevoProducto, stock_actual: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Stock Mínimo</label>
              <input type="number" value={nuevoProducto.stock_minimo} onChange={(e) => setNuevoProducto({...nuevoProducto, stock_minimo: e.target.value})} />
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
                    {producto.imagenPreview ? <img src={producto.imagenPreview} alt="" className="tabla-imagen" /> : "—"}
                  </td>
                  <td><strong>{producto.nombre}</strong></td>
                  <td>{producto.codigo_barra || '—'}</td>
                  <td>S/ {producto.precio_venta}</td>
                  <td className={producto.stock_actual <= producto.stock_minimo ? 'stock-bajo' : ''}>
                    {producto.stock_actual} / {producto.stock_minimo}
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