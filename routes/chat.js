const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Buscar mensagens
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enviar mensagem
router.post("/", async (req, res) => {
  try {
    const message = new Message({
      content: req.body.content,
      sender: req.body.sender,
    });
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
