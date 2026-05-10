import { useState } from 'react';
import './Perfil.css';

function Perfil({ usuario, onUpdateUser, onClose }) {
  const [formData, setFormData] = useState({
    nombre: usuario.nombre || '',
    apellido: usuario.apellido || '',
    email: usuario.email || '',
    telefono: usuario.telefono || ''
  });

  const [imagenPreview, setImagenPreview] = useState(usuario.foto || null);
  const [imagenFile, setImagenFile] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const eliminarImagen = () => {
    setImagenPreview(null);
    setImagenFile(null);
  };

  const handleGuardar = () => {
    const updatedUser = {
      ...usuario,
      ...formData,
      foto: imagenPreview
    };
    onUpdateUser(updatedUser);
  };

  const handleCancelar = () => {
    if (onClose) {
      onClose(); 
    }
  };

  return (
    <div className="perfil-container">
      <h2>Perfil de Usuario</h2>

      <div className="perfil-card">
        <div className="perfil-imagen-section">
          <div className="perfil-avatar">
            {imagenPreview ? (
              <img src={imagenPreview} alt="Perfil" />
            ) : (
              <span className="avatar-placeholder">AF</span>
            )}
          </div>

          <div className="imagen-botones">
            <label className="btn-subir-imagen">
              Subir Nueva Imagen
              <input type="file" accept="image/*" onChange={handleImagenChange} hidden />
            </label>
            {imagenPreview && (
              <button className="btn-eliminar-imagen" onClick={eliminarImagen}>
                Eliminar Imagen
              </button>
            )}
          </div>
        </div>

        <div className="perfil-form">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Apellido</label>
            <input
              type="text"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button className="btn-cancelar" onClick={handleCancelar}>
              Cancelar
            </button>
            <button className="btn-guardar" onClick={handleGuardar}>
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;