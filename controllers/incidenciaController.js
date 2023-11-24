const Incidencia = require('../models/incidencia');
const Remitente = require('../models/remitente');

exports.crearIncidenciaConRemitente = (req, res) => {
    console.log(req.body); // Para mostrar por consola
    let datosIncidencia = req.body.incidencia;
    datosIncidencia.id_estado = datosIncidencia.id_estado || 1; // Estado "Nuevo" por defecto

    if (req.body.remitente && req.body.remitente.id_remitente) {
        // Caso: Usar un remitente existente
        datosIncidencia.id_remitente = req.body.remitente.id_remitente;
        crearIncidencia(datosIncidencia, res);
    } else {
        // Caso: Crear un nuevo remitente
        const datosRemitente = req.body.remitente;
        Remitente.crear(datosRemitente, (errorRemitente, resultadoRemitente) => {
            if (errorRemitente) {
                return res.status(500).send({ mensaje: "Error al crear remitente", error: errorRemitente });
            }

            datosIncidencia.id_remitente = resultadoRemitente.insertId;
            crearIncidencia(datosIncidencia, res);
        });
    }
};

function crearIncidencia(datosIncidencia, res) {
    Incidencia.crear(datosIncidencia, (errorIncidencia, resultadoIncidencia) => {
        if (errorIncidencia) {
            return res.status(500).send({ mensaje: "Error al crear incidencia", error: errorIncidencia });
        }
        res.status(201).send({ mensaje: "Incidencia creada exitosamente", idIncidencia: resultadoIncidencia.insertId });
    });
}

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
