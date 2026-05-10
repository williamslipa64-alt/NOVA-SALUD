module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'nova_salud_super_secret_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
};