const express = require('express');
const router = express.Router();
const remitenteController = require('../controllers/remitenteController');

// Ruta para crear un nuevo remitente
router.post('/remitentes', remitenteController.crearRemitente);

// Ruta para obtener todos los remitentes
router.get('/remitentes', remitenteController.obtenerRemitentes);

// Otras rutas como PUT, DELETE...

module.exports = router;
