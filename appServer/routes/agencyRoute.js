const express = require("express");
const router = express.Router();
const Agency = require("../models/agencyModels");

// Crear agencia
router.post("/", (req, res) => {
  const { name, address } = req.body;
  Agency.create(name, address, (err, id) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear la agencia" });
    }
    res.status(201).json({ message: "Agencia creada", id });
  });
});

// Obtener todas las agencias
router.get("/", (req, res) => {
  Agency.getAll((err, agencies) => {
    if (err) {
      return res.status(500).json({ error: "Error al cargar las agencias" });
    }
    res.json(agencies);
  });
});

// Obtener una agencia por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Agency.getById(id, (err, agency) => {
    if (err) {
      return res.status(500).json({ error: "No se puede cargar la agencia" });
    }
    if (!agency) {
      return res.status(404).json({ error: "No existe la agencia" });
    }
    res.json(agency);
  });
});

// Actualizar una agencia
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, address } = req.body;
  Agency.update(id, name, address, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar la agencia" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe la agencia" });
    }
    res.json({ message: "Agencia actualizada" });
  });
});

// Eliminar agencia
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Agency.delete(id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "No se puede eliminar la agencia" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe la agencia" });
    }
    res.json({ message: "Agencia eliminada" });
  });
});

module.exports = router;
