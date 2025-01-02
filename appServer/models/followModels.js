const db = require("../config/dbMySQL");

const Follow = {};

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

// Crear un nuevo Follow
Follow.create = (type, detail, callback) => {
  const query = "INSERT INTO follow (type, detail) VALUES(?, ?)";
  queryDatabase(query, [type, detail], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

// Obtener todos los registros de Follow
Follow.getAll = (callback) => {
  const query = "SELECT * FROM follow";
  queryDatabase(query, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Obtener un Follow por ID
Follow.getById = (id, callback) => {
  const query = "SELECT * FROM follow WHERE id=?";
  queryDatabase(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Actualizar un Follow
Follow.update = (id, type, detail, callback) => {
  const query = "UPDATE follow SET type=?, detail=? WHERE id=?";
  queryDatabase(query, [type, detail, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

// Eliminar un Follow
Follow.delete = (id, callback) => {
  const query = "DELETE FROM follow WHERE id=?";
  queryDatabase(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

module.exports = Follow;
