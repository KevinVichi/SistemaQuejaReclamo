const db = require("../config/dbMySQL");

const Client = {};

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
Client.create = (name, phone, email, callback) => {
  const query = "INSERT INTO client (name, phone, email) VALUES(?,?,?)";
  queryDatabase(query, [name, phone, email], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

// Obtener registros
Client.getAll = (callback) => {
  const query = "SELECT * FROM client";
  queryDatabase(query, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Obtener un solo registro
Client.getById = (id, callback) => {
  const query = "SELECT * FROM client WHERE id=?";
  queryDatabase(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Actualizar registro
Client.update = (id, name, phone, email, callback) => {
  const query = "UPDATE client SET name=?, phone=?, email=? WHERE id=?";
  queryDatabase(query, [name, phone, email, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

// Eliminar registro
Client.delete = (id, callback) => {
  const query = "DELETE FROM client WHERE id=?";
  queryDatabase(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

module.exports = Client;
