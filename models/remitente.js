const db = require('../db.js');

class Remitente {
    // Método para crear un nuevo remitente
    static crear(datosRemitente, callback) {
        db.query('INSERT INTO Remitente SET ?', datosRemitente, callback);
    }

    // Método para obtener todos los remitentes
    static obtenerTodos(callback) {
        db.query('SELECT * FROM Remitente', callback);
    }

    // Otros métodos como obtenerPorId, actualizar, eliminar...
}

module.exports = Remitente;
