const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const endpoints = {
    api: {
      memories: `${baseUrl}/api/memories`,
      gallery: `${baseUrl}/api/gallery`,
      wishlist: `${baseUrl}/api/wishlist`,
      tracks: `${baseUrl}/api/tracks`,
      quizzes: `${baseUrl}/api/quizzes`,
      chat: `${baseUrl}/api/chat`,
      upload: `${baseUrl}/api/upload`,
    },
    uploads: `${baseUrl}/uploads`,
    status: "API is running",
  };

  res.json(endpoints);
});

module.exports = router;
