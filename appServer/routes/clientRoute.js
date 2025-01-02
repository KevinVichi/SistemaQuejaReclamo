const express = require("express");
const router = express.Router();
const Client = require("../models/clientModels");

// Crear cliente
router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  Client.create(name, phone, email, (err, id) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al crear cliente", details: err });
    }

    res.status(201).json({ message: "Cliente creado", id });
  });
});

// Obtener todas los clientes
router.get("/", (req, res) => {
  Client.getAll((err, clients) => {
    if (err) {
      return res.status(500).json({ error: "Error al cargar los clientes" });
    }
    res.json(clients);
  });
});

// Obtener un cliente por ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Client.getById(id, (err, Client) => {
    if (err) {
      return res.status(500).json({ error: "No se puede cargar el cliente" });
    }
    if (!Client) {
      return res.status(404).json({ error: "No existe el cliente" });
    }
    res.json(Client);
  });
});

// Actualizar un cliente
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, phone, email } = req.body;
  Client.update(id, name, phone, email, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el cliente" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el cliente" });
    }
    res.json({ message: "Cliente actualizada" });
  });
});

// Eliminar cliente
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Client.delete(id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: "No se puede eliminar el cliente" });
    }
    if (affectedRows === 0) {
      return res.status(404).json({ error: "No existe el cliente" });
    }
    res.json({ message: "Cliente eliminado" });
  });
});

module.exports = router;
