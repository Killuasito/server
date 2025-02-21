const router = require("express").Router();
const Memory = require("../models/Memory");

// Buscar todas as memórias
router.get("/", async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Adicionar memória
router.post("/", async (req, res) => {
  try {
    const memory = new Memory({
      ...req.body,
      color: req.body.color || "pink", // Garantir que sempre tem uma cor
    });
    const savedMemory = await memory.save();
    res.status(201).json(savedMemory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar memória
router.delete("/:id", async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.json({ message: "Memória deletada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
