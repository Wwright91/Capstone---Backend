require("dotenv").config();

const cors = require("cors");
const express = require("express");
const axios = require("axios")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

const API_key = process.env.REACT_APP_GOOGLE_API_KEY;

app.get('/places/details', async (req, res) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?&place_id=${req.query.place_id}&key=${API_key}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
  }
});

const businessesController = require("./controllers/businessesController.js");
app.use("/businesses", businessesController);

const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;