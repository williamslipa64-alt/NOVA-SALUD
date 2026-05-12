const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas sin autenticación temporal para pruebas
router.get('/', productoController.getAll);
router.post('/', productoController.upload.single('imagen'), productoController.create);

module.exports = router;