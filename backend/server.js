const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/rates", async (req, res) => {
  try {
    if (!process.env.FIXER_API_KEY) {
      throw new Error("FIXER_API_KEY is not configured");
    }

    const response = await axios.get(
      "https://api.apilayer.com/fixer/latest",
      {
        headers: {
          apikey: process.env.FIXER_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Fixer API error:", error.message);

    res.status(500).json({
      error: "Failed to retrieve currency rates",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});