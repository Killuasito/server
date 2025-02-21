const router = require("express").Router();
const Photo = require("../models/Photo");

// Buscar todas as fotos
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ date: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Adicionar foto
router.post("/", async (req, res) => {
  const photo = new Photo(req.body);
  try {
    const savedPhoto = await photo.save();
    res.status(201).json(savedPhoto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar foto
router.delete("/:id", async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: "Foto deletada" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
