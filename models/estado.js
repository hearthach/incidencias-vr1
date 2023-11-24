const db = require('../db.js');

class Estado {
    static crear(nombreEstado, callback) {
        db.query('INSERT INTO Estados (nombre_estado) VALUES (?)', [nombreEstado], callback);
    }

    static obtenerTodos(callback) {
        db.query('SELECT * FROM Estados', callback);
    }

    // Aquí puedes agregar métodos adicionales como actualizar o eliminar
}

module.exports = Estado;
