const Producto = require('../models/Producto');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Crea esta carpeta en backend
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    console.log("Archivo recibido:", req.file);

    const producto = await Producto.create({
      ...req.body,
      imagen_url: req.file ? `/uploads/${req.file.filename}` : null
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error("Error creando producto:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAll: exports.getAll, create: exports.create, upload };