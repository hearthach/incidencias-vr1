const Incidencia = require('../models/incidencia');
const Remitente = require('../models/remitente');

exports.crearIncidenciaConRemitente = (req, res) => {
    console.log(req.body); // Imprimirá el cuerpo de la solicitud

    const datosRemitente = req.body.remitente;
    let datosIncidencia = req.body.incidencia;

    // Establecer el valor predeterminado de '1' para id_tipo_incidencia si no se proporciona
    datosIncidencia.id_tipo_incidencia = datosIncidencia.id_tipo_incidencia || 1;

    Remitente.crear(datosRemitente, (errorRemitente, resultadoRemitente) => {
        if (errorRemitente) {
            return res.status(500).send({ mensaje: "Error al crear remitente", error: errorRemitente });
        }

        const idRemitente = resultadoRemitente.insertId;
        datosIncidencia.id_remitente = idRemitente;
        datosIncidencia.id_estado = 1; // Estado "Nuevo" por defecto

        Incidencia.crear(datosIncidencia, (errorIncidencia, resultadoIncidencia) => {
            if (errorIncidencia) {
                return res.status(500).send({ mensaje: "Error al crear incidencia", error: errorIncidencia });
            }
            res.status(201).send({ mensaje: "Incidencia creada exitosamente", idIncidencia: resultadoIncidencia.insertId });
        });
    });
};

exports.crearIncidencia = (req, res) => {
    Incidencia.crear(req.body, (error, resultado) => {
        if (error) {
            return res.status(500).send({ mensaje: "Error al crear la incidencia", error });
        }
        res.status(201).send({ mensaje: "Incidencia creada exitosamente", idIncidencia: resultado.insertId });
    });
};

exports.obtenerIncidencias = (req, res) => {
    Incidencia.obtenerTodos((error, incidencias) => {
        if (error) {
            return res.status(500).send({ mensaje: "Error al obtener las incidencias", error });
        }
        res.status(200).send(incidencias);
    });
};

// Puedes agregar más controladores para actualizar, eliminar, etc.
