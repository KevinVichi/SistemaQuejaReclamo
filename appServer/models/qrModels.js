const db = require("../config/dbMySQL");

const Qr = {};

// Función auxiliar para manejar consultas a la base de datos
const queryDatabase = (query, params, callback) => {
  db.query(query, params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// Crear un nuevo QR
Qr.create = (name, description, callback) => {
  const query = "INSERT INTO qr (name, description) VALUES(?, ?)";
  queryDatabase(query, [name, description], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

// Obtener todos los registros de QR
Qr.getAll = (callback) => {
  const query = "SELECT * FROM qr";
  queryDatabase(query, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Obtener un QR por ID
Qr.getById = (id, callback) => {
  const query = "SELECT * FROM qr WHERE id=?";
  queryDatabase(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Actualizar un QR
Qr.update = (id, name, description, callback) => {
  const query = "UPDATE qr SET name=?, description=? WHERE id=?";
  queryDatabase(query, [name, description, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

// Eliminar un QR
Qr.delete = (id, callback) => {
  const query = "DELETE FROM qr WHERE id=?";
  queryDatabase(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

module.exports = Qr;
