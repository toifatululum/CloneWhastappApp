import express from "express";
import mongoose from "mongoose";
import Messages from "./db.Messages.js";
import Pusher from "pusher";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config()
//app config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1069891",
  key: "e819827525f94bc5fe2d",
  secret: "4669a0fa13a2d23c4593",
  cluster: "ap1",
  encrypted: true,
});

//middleware
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Headers", "*");
  next();
});

//DB config
const connection_url =
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.mptbl.mongodb.net:27017,cluster0-shard-00-01.mptbl.mongodb.net:27017,cluster0-shard-00-02.mptbl.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-2xyxo7-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");

  const msgCollection = db.collection("messagecontent");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("change", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved
      });
    } else {
      console.log("Error trigger pusher");
    }
  });
});

//???

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/async", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));