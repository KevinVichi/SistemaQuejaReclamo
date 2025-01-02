const express = require("express");
const router = express.Router();
const Follow = require("../models/followModels");

// Crear un Follow
router.post("/", (req, res) => {
  const { type, detail } = req.body;
  Follow.create(type, detail, (err, id) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear Follow", details: err });
    }
    res.status(201).json({ message: "Follow creado", id });
  });
});

// Obtener todos los Follow
router.get("/", (req, res) => {
  Follow.getAll((err, follows) => {
    if (err) {
      return res.status(500).json({ error: "Error al cargar los Follows" });
    }
    res.json(follows);
  });
});

// Obtener un Follow por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Follow.getById(id, (err, follow) => {
    if (err) {
      return res.status(500).json({ error: "No se puede cargar el Follow" });
    }
    if (!follow) {
      return res.status(404).json({ error: "No existe el Follow" });
    }
    res.json(follow);
  });
});

// Actualizar un Follow
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { type, detail } = req.body;
  Follow.update(id, type, detail, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el Follow" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el Follow" });
    }
    res.json({ message: "Follow actualizado" });
  });
});

// Eliminar un Follow
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Follow.delete(id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "No se puede eliminar el Follow" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el Follow" });
    }
    res.json({ message: "Follow eliminado" });
  });
});

module.exports = router;
