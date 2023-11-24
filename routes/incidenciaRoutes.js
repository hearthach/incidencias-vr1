const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');

// Ruta para crear una nueva incidencia con un remitente
router.post('/incidencias', incidenciaController.crearIncidenciaConRemitente);

// Ruta para obtener todas las incidencias
router.get('/incidencias', incidenciaController.obtenerIncidencias);


/**
 * @swagger
 * /incidencia:
 *   post:
 *     summary: Crea una nueva Incidencia
 *     tags: [Incidencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_remitente:
 *                 type: integer
 *                 description: El ID del remitente del reclamo.
 *               descripcion:
 *                 type: string
 *                 description: Descripción del reclamo.
 *     responses:
 *       201:
 *         description: Reclamo creado
 */
router.post('/incidencias', incidenciaController.crearIncidencia);

// Rutas adicionales para obtener, actualizar, eliminar, etc.

/**
 * @swagger
 * /reclamos:
 *   get:
 *     summary: Obtiene una lista de todos los reclamos
 *     tags: [Reclamos]
 *     responses:
 *       200:
 *         description: Lista de reclamos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_reclamo:
 *                     type: integer
 *                     description: El ID del reclamo.
 *                   id_remitente:
 *                     type: integer
 *                     description: El ID del remitente del reclamo.
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del reclamo.
 */
router.get('/incidencias', incidenciaController.obtenerIncidencias);

// Aquí puedes agregar más rutas para actualizar, eliminar, etc.

module.exports = router;