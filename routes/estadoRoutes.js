const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Ruta para crear un nuevo estado
router.post('/estados', estadoController.crearEstado);

// Ruta para obtener todos los estados
router.get('/estados', estadoController.obtenerEstados);

// Aquí puedes agregar rutas adicionales como PUT, DELETE...

module.exports = router;
