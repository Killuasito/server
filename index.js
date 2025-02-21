const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const quizRouter = require("./routes/quizzes");
const uploadRouter = require("./routes/upload");
const path = require("path");
const fs = require("fs");

dotenv.config();

// Verificar e imprimir variáveis de ambiente no início
console.log("Ambiente:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? "Definido" : "Não definido",
});

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI não está definido nas variáveis de ambiente");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;
console.log("Configuração do MongoDB:", {
  uri: MONGODB_URI,
  env: process.env.NODE_ENV,
});

const app = express();

// Ensure uploads directory exists with absolute path
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Update CORS configuration
const corsOptions = {
  origin: "*", // Temporariamente permitir todas as origens
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Adicionar essas linhas antes das rotas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Adicionar esta linha para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Configure static file serving
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=31536000");
    },
  })
);

console.log("Tentando conectar ao MongoDB em:", MONGODB_URI);

mongoose.set("debug", true); // Adicionar isso antes da conexão para ver mais detalhes

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  })
  .catch((err) => {
    console.error("Erro detalhado ao conectar:", {
      name: err.name,
      message: err.message,
      code: err.code,
      codeName: err.codeName,
      database: mongoose.connection.name,
      host: mongoose.connection.host,
    });
    process.exit(1);
  });

// Adicionar antes das outras rotas
app.use("/", require("./routes/index"));

// Rotas
app.use("/api/memories", require("./routes/memories"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/tracks", require("./routes/tracks"));
app.use("/api/quizzes", quizRouter);
app.use("/api/chat", require("./routes/chat"));
app.use("/api/upload", uploadRouter);

const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port}`)
);
