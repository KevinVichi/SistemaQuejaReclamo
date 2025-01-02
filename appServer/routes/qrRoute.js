const express = require("express");
const router = express.Router();
const Qr = require("../models/qrModels");

// Crear un QR
router.post("/", (req, res) => {
  const { name, description } = req.body; // Cambiado url por description
  Qr.create(name, description, (err, id) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear QR", details: err });
    }
    res.status(201).json({ message: "QR creado", id });
  });
});

// Obtener todos los QRs
router.get("/", (req, res) => {
  Qr.getAll((err, qrs) => {
    if (err) {
      return res.status(500).json({ error: "Error al cargar los QRs" });
    }
    res.json(qrs);
  });
});

// Obtener un QR por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Qr.getById(id, (err, qr) => {
    if (err) {
      return res.status(500).json({ error: "No se puede cargar el QR" });
    }
    if (!qr) {
      return res.status(404).json({ error: "No existe el QR" });
    }
    res.json(qr);
  });
});

// Actualizar un QR
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body; // Cambiado url por description
  Qr.update(id, name, description, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el QR" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el QR" });
    }
    res.json({ message: "QR actualizado" });
  });
});

// Eliminar un QR
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Qr.delete(id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "No se puede eliminar el QR" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el QR" });
    }
    res.json({ message: "QR eliminado" });
  });
});

module.exports = router;
