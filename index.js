const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("just checking!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbqng.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log("connected to database");
  const bookCollections = client.db("book").collection("collections");
  const orderCollections = client.db("book").collection("orders");

  app.get("/books", (req, res) => {
    bookCollections.find().toArray((err, items) => {
      res.send(items);
    });
  });

  app.post("/addBook", (req, res) => {
    const newBook = req.body;
    console.log("new book added", newBook);
    bookCollections.insertOne(newBook).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addOrder", (req, res) => {
    const newOrder = req.body;
    orderCollections.insertOne(newOrder).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/orders", (req, res) => {
    orderCollections
      .find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = ObjectId(req.params.id);
    bookCollections.deleteOne({ _id: id }).then((result) => {
      if (result) {
        event.target.parentNode.style.display = "none";
      }
    });
  });
});

app.listen(process.env.port || port);
