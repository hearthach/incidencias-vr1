const Estado = require('../models/estado');

exports.crearEstado = (req, res) => {
    Estado.crear(req.body.nombre_estado, (error, resultado) => {
        if (error) {
            res.status(500).send({ mensaje: "Error al crear estado", error });
        } else {
            res.status(201).send({ mensaje: "Estado creado exitosamente", idEstado: resultado.insertId });
        }
    });
};

exports.obtenerEstados = (req, res) => {
    Estado.obtenerTodos((error, estados) => {
        if (error) {
            res.status(500).send({ mensaje: "Error al obtener estados", error });
        } else {
            res.status(200).send(estados);
        }
    });
};

// Aquí puedes agregar métodos adicionales como actualizar o eliminar
