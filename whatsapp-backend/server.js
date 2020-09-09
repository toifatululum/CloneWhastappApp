import express from "express";
import mongoose from "mongoose";
import Messages from "./db.Messages.js";
import Pusher from "pusher";
import cors from "cors";

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
  "mongodb+srv://admin:admin1701@cluster0.mptbl.mongodb.net/<whatsaapdb>?retryWrites=true&w=majority";
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
