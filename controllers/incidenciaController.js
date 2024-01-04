// controllers/incidenciaController.js
const Incidencia = require("../models/incidencia");
const Remitente = require("../models/remitente");
const sendEmail = require("../utils/mailer");


exports.crearIncidenciaConRemitente = (req, res) => {
  console.log(req.body); // Para mostrar por consola
  let datosIncidencia = req.body.incidencia || {};
  datosIncidencia.id_estado = datosIncidencia.id_estado || 1; // Estado "Nuevo" por defecto

  if (req.body.remitente && req.body.remitente.id_remitente) {
    // Caso: Usar un remitente existente
    datosIncidencia.id_remitente = req.body.remitente.id_remitente;
    crearIncidencia(datosIncidencia, res, req.body); // se pasasar req.body
  } else {
    // Caso: Crear un nuevo remitente
    const datosRemitente = req.body.remitente || {};
    Remitente.crear(datosRemitente, (errorRemitente, resultadoRemitente) => {
      if (errorRemitente) {
        return res
          .status(500)
          .send({ mensaje: "Error al crear remitente", error: errorRemitente });
      }

      datosIncidencia.id_remitente = resultadoRemitente.insertId;
      crearIncidencia(datosIncidencia, res, req.body); // pasamo el req.body
    });
  }
};

function crearIncidencia(datosIncidencia, res, requestBody) {
    Incidencia.crear(datosIncidencia, (errorIncidencia, resultadoIncidencia) => {
        if (errorIncidencia) {
            return res.status(500).send({ mensaje: "Error al crear incidencia", error: errorIncidencia });
        }
      
        // Enviar correo electrónico después de crear la incidencia
        const emailOptions = {
            from: process.env.EMAIL_FROM, // Configura estas variables en tu archivo .env
            to: process.env.EMAIL_TO,
            subject: 'Nueva Incidencia Registrada',
            text: `Se ha registrado una nueva incidencia: ${requestBody.incidencia.descripcion}` //verificars ruta es correcta y existe
        };
      
        // Llama a la función sendEmail de mailer.js
        sendEmail(emailOptions);
      
        res.status(201).send({
            mensaje: "Incidencia creada exitosamente",
            idIncidencia: resultadoIncidencia.insertId,
        });
    });
}

exports.crearIncidencia = (req, res) => {
    Incidencia.crear(req.body, (error, resultado) => {
        if (error) {
            return res.status(500).send({ mensaje: "Error al crear la incidencia", error });
        }

        // Enviar correo electrónico después de crear la incidencia
        const emailOptions = {
            from: process.env.EMAIL_FROM, 
            to: process.env.EMAIL_TO,
            subject: 'Nueva Incidencia Registrada',
            text: `Se ha registrado una nueva incidencia: ${req.body.descripcion}` // Averificar si la descripción existe en req.body
        };

        // Llama a la función sendEmail de mailer.js
        sendEmail(emailOptions);

        res.status(201).send({
            mensaje: "Incidencia creada exitosamente",
            idIncidencia: resultado.insertId,
        });
    });
};

exports.obtenerIncidencias = (req, res) => {
  Incidencia.obtenerTodos((error, incidencias) => {
    if (error) {
      return res
        .status(500)
        .send({ mensaje: "Error al obtener las incidencias", error });
    }
    res.status(200).send(incidencias);
  });
};
