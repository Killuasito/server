const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const mongoose = require("mongoose");

// Listar todos os quizzes
router.get("/", async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
});

// Criar novo quiz
router.post("/", async (req, res, next) => {
  try {
    const quiz = new Quiz({
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions,
    });
    const savedQuiz = await quiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    next(error);
  }
});

// Obter quiz específico
router.get("/:id", async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz não encontrado" });
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
});

// Deletar quiz
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
        details: "O ID fornecido não é um ID válido do MongoDB",
      });
    }

    const quiz = await Quiz.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz não encontrado",
      });
    }

    res.json({
      success: true,
      message: "Quiz deletado com sucesso",
      deletedQuiz: quiz,
    });
  } catch (error) {
    console.error("Erro ao deletar quiz:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao deletar quiz",
      error: error.message,
    });
  }
});

module.exports = router;
