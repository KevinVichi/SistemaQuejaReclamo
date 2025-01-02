const db = require("../config/dbMySQL");

const Employee = {};

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

// Crear un empleado
Employee.create = (name, phone, address, email, callback) => {
  const query =
    "INSERT INTO employee (name, phone, address, email) VALUES(?,?,?,?)";
  queryDatabase(query, [name, phone, address, email], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.insertId);
    }
  });
};

// Obtener todos los empleados
Employee.getAll = (callback) => {
  const query = "SELECT * FROM employee";
  queryDatabase(query, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Obtener un empleado por ID
Employee.getById = (id, callback) => {
  const query = "SELECT * FROM employee WHERE id=?";
  queryDatabase(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Actualizar un empleado
Employee.update = (id, name, phone, address, email, callback) => {
  const query =
    "UPDATE employee SET name=?, phone=?, address=?, email=? WHERE id=?";
  queryDatabase(query, [name, phone, address, email, id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

// Eliminar un empleado
Employee.delete = (id, callback) => {
  const query = "DELETE FROM employee WHERE id=?";
  queryDatabase(query, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.affectedRows);
    }
  });
};

module.exports = Employee;
