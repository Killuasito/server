const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const quizRouter = require("./routes/quizzes");
const uploadRouter = require("./routes/upload");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

// Ensure uploads directory exists with absolute path
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Update CORS configuration
const corsOptions = {
  origin: process.env.RAILWAY_STATIC_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

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

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/timo";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

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
