const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
    }

    const user = await authService.register({ nombre, apellido, email, password });
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    const { user, token } = await authService.login(email, password);

    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol_id: user.rol_id
      },
      token
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};