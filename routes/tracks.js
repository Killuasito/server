const router = require("express").Router();
const Track = require("../models/Track");

// Buscar todas as músicas
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Adicionar música
router.post("/", async (req, res) => {
  const track = new Track(req.body);
  try {
    const savedTrack = await track.save();
    res.status(201).json(savedTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar música
router.delete("/:id", async (req, res) => {
  try {
    await Track.findByIdAndDelete(req.params.id);
    res.json({ message: "Música removida" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
