const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
