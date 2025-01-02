const db = require("../config/dbMySQL");

const Channel = {};

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

// Crear un cliente
Channel.create = (name, type, callback) => {
  const query = "INSERT INTO channel (name, type) VALUES(?,?)";
  queryDatabase(query, [name, type], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

// Obtener registros
Channel.getAll = (callback) => {
  const query = "SELECT * FROM channel";
  queryDatabase(query, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Obtener un solo registro
Channel.getById = (id, callback) => {
  const query = "SELECT * FROM channel WHERE id=?";
  queryDatabase(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Actualizar registro
Channel.update = (id, name, type, callback) => {
  const query = "UPDATE channel SET name=?, type=? WHERE id=?";
  queryDatabase(query, [name, type, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

// Eliminar registro
Channel.delete = (id, callback) => {
  const query = "DELETE FROM channel WHERE id=?";
  queryDatabase(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

module.exports = Channel;
