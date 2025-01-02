const db = require("../config/dbMySQL");

const Agency = {};

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

// Crear una agencia
Agency.create = (name, address, callback) => {
  const query = "INSERT INTO agency (name, address) VALUES(?,?)";
  queryDatabase(query, [name, address], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

// Obtener registros
Agency.getAll = (callback) => {
  const query = "SELECT * FROM agency";
  queryDatabase(query, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Obtener un solo registro
Agency.getById = (id, callback) => {
  const query = "SELECT * FROM agency WHERE id=?";
  queryDatabase(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Actualizar registro
Agency.update = (id, name, address, callback) => {
  const query = "UPDATE agency SET name=?, address=? WHERE id=?";
  queryDatabase(query, [name, address, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

// Eliminar registro
Agency.delete = (id, callback) => {
  const query = "DELETE FROM agency WHERE id=?";
  queryDatabase(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

module.exports = Agency;
