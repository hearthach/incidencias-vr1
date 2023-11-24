const db = require('../db');

class TipoIncidencia {
    static crear(nombreTipo, callback) {
        db.query('INSERT INTO TipoIncidencia (nombre_tipo) VALUES (?)', [nombreTipo], callback);
    }

    static obtenerTodos(callback) {
        db.query('SELECT * FROM TipoIncidencia', callback);
    }

    // Puedes agregar métodos adicionales si necesitas
}

module.exports = TipoIncidencia;
