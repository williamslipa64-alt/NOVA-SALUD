const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

class AuthService {
  async register(data) {
    const existingUser = await User.findByEmail(data.email);
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);

    
    return await User.create({
      nombre: data.nombre,
      apellido: data.apellido || '',
      email: data.email,
      password_hash,
      rol_id: 1   
    });
  }

  async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
      { id: user.id, email: user.email, rol_id: user.rol_id },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    return { user, token };
  }
}

module.exports = new AuthService();