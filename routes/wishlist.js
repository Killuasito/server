const router = require("express").Router();
const Wish = require("../models/Wish");

// Buscar todos os desejos
router.get("/", async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });
    res.json(wishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Adicionar desejo
router.post("/", async (req, res) => {
  const wish = new Wish(req.body);
  try {
    const savedWish = await wish.save();
    res.status(201).json(savedWish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Atualizar status do desejo
router.patch("/:id", async (req, res) => {
  try {
    const updatedWish = await Wish.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updatedWish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar desejo
router.delete("/:id", async (req, res) => {
  try {
    await Wish.findByIdAndDelete(req.params.id);
    res.json({ message: "Desejo deletado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
