const TipoIncidencia = require('../models/tipoIncidencia');

exports.crearTipoIncidencia = (req, res) => {
    TipoIncidencia.crear(req.body.nombre_tipo, (error, resultado) => {
        if (error) {
            return res.status(500).send({ mensaje: "Error al crear tipo de incidencia", error });
        }
        res.status(201).send({ mensaje: "Tipo de incidencia creado exitosamente", idTipoIncidencia: resultado.insertId });
    });
};

exports.obtenerTiposIncidencia = (req, res) => {
    TipoIncidencia.obtenerTodos((error, tipos) => {
        if (error) {
            return res.status(500).send({ mensaje: "Error al obtener tipos de incidencia", error });
        }
        res.status(200).send(tipos);
    });
};

// Puedes agregar métodos adicionales si necesitas
