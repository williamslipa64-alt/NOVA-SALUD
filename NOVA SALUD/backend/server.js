const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

require('./config/db');

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/api/protected', require('./middlewares/authMiddleware'), (req, res) => {
  res.json({ 
    message: "Ruta protegida funcionando",
    user: req.user 
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: " Backend Nova Salud v1.0",
    status: "ok",
    port: PORT 
  });
});
// Crear carpeta uploads si no existe
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use('/api/productos', require('./routes/productoRoutes'));
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});