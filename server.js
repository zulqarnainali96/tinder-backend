import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";

// App Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const connection_url =
  "mongodb+srv://heroappman:JsWEJ6Hdpxixeq79@cluster0.i1irues.mongodb.net/?retryWrites=true&w=majority";

// Middlewares

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());

// DB Config

async function connect() {
  try {
    await mongoose.connect(connection_url);
    console.log(`Connected to mongoose`);
  } catch (error) {
    console.log(error);
  }
}
connect();

const tinderCardSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
});

const tinderclone = mongoose.model("tinderclone", tinderCardSchema);



//API Endpoints

app.get("/", function (req, res) {
  res.status(200).send("HELLO WORLD!");
});

app.post("/tinder-card", async (req, res) => {
  const Card = req.body;
  const newTinderCard = await tinderclone.create({
    id: Card?.id,
    name: Card?.name,
    url: Card?.url,
  });
  console.log(newTinderCard);
  if (!newTinderCard) {
    res.status(500).send(err);
  } else {
    res.status(201).send(newTinderCard);
  }
});
app.get("/tinder-card", async (req, res) => {
  const allCards = await tinderclone.find();
  if (allCards.length) {
    res.status(200).send(allCards);
  } else {
    res.status(404).send("No Data Found");
  }
});

// Listener

app.listen(PORT, () => {
  console.log(`Server is started at Port : ${PORT}`);
});
