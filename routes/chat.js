const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.get("/", async (req, res) => {
  try {
    const chat = await Chat.findOne();
    if (!chat) {
      // Se não existir chat, cria um novo
      const newChat = new Chat({ messages: [] });
      await newChat.save();
      return res.json([]);
    }
    res.json(chat.messages);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.content || !req.body.sender) {
      return res
        .status(400)
        .json({ message: "Conteúdo e remetente são obrigatórios" });
    }

    let chat = await Chat.findOne();
    if (!chat) {
      chat = new Chat({ messages: [] });
    }

    const newMessage = {
      content: req.body.content,
      sender: req.body.sender,
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
