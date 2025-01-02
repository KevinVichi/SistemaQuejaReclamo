const express = require("express");
const router = express.Router();
const Channel = require("../models/channelModels");

// Crear canal
router.post("/", (req, res) => {
  const { name, type } = req.body;
  Channel.create(name, type, (err, id) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear el canal" });
    }
    res.status(201).json({ message: "Agencia creada", id });
  });
});

// Obtener todas las agencias
router.get("/", (req, res) => {
  Channel.getAll((err, agencies) => {
    if (err) {
      return res.status(500).json({ error: "Error al cargar los canales" });
    }
    res.json(agencies);
  });
});

// Obtener una canal por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Channel.getById(id, (err, channel) => {
    if (err) {
      return res.status(500).json({ error: "No se puede cargar el canal" });
    }
    if (!channel) {
      return res.status(404).json({ error: "No existe el canal" });
    }
    res.json(channel);
  });
});

// Actualizar una canal
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, type } = req.body;
  Channel.update(id, name, type, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el canal" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el canal" });
    }
    res.json({ message: "Canal actualizado" });
  });
});

// Eliminar canal
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Channel.delete(id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "No se puede eliminar el canal" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el canal" });
    }
    res.json({ message: "Agencia eliminada" });
  });
});

module.exports = router;
