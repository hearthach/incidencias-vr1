const Remitente = require('../models/remitente');

exports.crearRemitente = (req, res) => {
    Remitente.crear(req.body, (error, resultado) => {
        if (error) {
            res.status(500).send({ mensaje: "Error al crear remitente", error });
        } else {
            res.status(201).send({ mensaje: "Remitente creado exitosamente", idRemitente: resultado.insertId });
        }
    });
};

exports.obtenerRemitentes = (req, res) => {
    Remitente.obtenerTodos((error, remitentes) => {
        if (error) {
            res.status(500).send({ mensaje: "Error al obtener remitentes", error });
        } else {
            res.status(200).send(remitentes);
        }
    });
};

// Otros métodos como obtenerPorId, actualizar, eliminar...
