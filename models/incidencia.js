const db = require('../db');

class Incidencia {
    static crear(nuevaIncidencia, callback) {
        const { id_remitente, id_tipo_incidencia, id_estado, descripcion } = nuevaIncidencia;
        db.query('INSERT INTO Incidencia (id_remitente, id_tipo_incidencia, id_estado, descripcion) VALUES (?, ?, ?, ?)', 
                 [id_remitente, id_tipo_incidencia, id_estado, descripcion], 
                 callback);
    }

    static obtenerTodos(callback) {
        db.query('SELECT * FROM Incidencia', callback);
    }

    // Aquí puedes agregar más métodos, como obtenerPorId, actualizar, eliminar...
}

module.exports = Incidencia;
