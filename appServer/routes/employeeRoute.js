const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModels");

// Crear empleado
router.post("/", (req, res) => {
  const { name, phone, address, email } = req.body;
  Employee.create(name, phone, address, email, (err, id) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear empleado", details: err });
    }
    res.status(201).json({ message: "Empleado creado", id });
  });
});

// Obtener todos los empleados
router.get("/", (req, res) => {
  Employee.getAll((err, employees) => {
    if (err) {
      return res.status(500).json({ error: "Error al cargar los empleados" });
    }
    res.json(employees);
  });
});

// Obtener un empleado por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Employee.getById(id, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: "No se puede cargar el empleado" });
    }
    if (!employee) {
      return res.status(404).json({ error: "No existe el empleado" });
    }
    res.json(employee);
  });
});

// Actualizar un empleado
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, phone, address, email } = req.body;
  Employee.update(id, name, phone, address, email, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el empleado" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el empleado" });
    }
    res.json({ message: "Empleado actualizado" });
  });
});

// Eliminar un empleado
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Employee.delete(id, (err, affectedRows) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "No se puede eliminar el empleado" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el empleado" });
    }
    res.json({ message: "Empleado eliminado" });
  });
});

module.exports = router;
