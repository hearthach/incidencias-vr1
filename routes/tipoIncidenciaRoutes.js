const express = require('express');
const router = express.Router();
const tipoIncidenciaController = require('../controllers/tipoIncidenciaController');

router.post('/tipoIncidencia', tipoIncidenciaController.crearTipoIncidencia);
router.get('/tipoIncidencia', tipoIncidenciaController.obtenerTiposIncidencia);

// Puedes agregar más rutas si necesitas

module.exports = router;
