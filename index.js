const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(express.json());
app.use(cors());
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("hello mongodb mamu");
});
//sinfullworld
//0D7Jcsgc1gHUS7TM
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.k9jkjo0.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

try {
  const recentshoot = client.db("extrashoot").collection("photo");
  const allService = client.db("addService").collection("singleService");
  const reviews = client.db("addService").collection("review");
  app.get("/extrashoot", async (req, res) => {
    const query = {};
    const cursor = recentshoot.find(query);
    const extrashoot = await cursor.toArray();
    res.send(extrashoot);
  });

  app.post("/addService", async (req, res) => {
    const order = req.body;
    const result = await allService.insertOne(order);
    res.send(result);
  });

  app.post("/review", async (req, res) => {
    const review = req.body;
    const result = await reviews.insertOne(review);
    res.send(result);
  });

  app.get("/review", async (req, res) => {
    let query = {};
    if (req.query.services) {
      query = {
        services: req.query.services,
      };
    }
    if (req.query.email) {
      query = {
        email: req.query.email,
      };
    }
    const cursor = reviews.find(query);
    const review = await cursor.toArray();
    res.send(review);
  });

  app.delete("/review/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await reviews.deleteOne(query);
    res.send(result);
  });

  app.get("/addService", async (req, res) => {
    const query = {};
    const sort = { length: -1 };
    const limit = 3;
    const cursor = allService.find(query).sort(sort).limit(limit);
    const service = await cursor.toArray();

    res.send(service);
  });
  app.get("/service", async (req, res) => {
    const query = {};
    const cursor = allService.find(query);
    const service = await cursor.toArray();
    res.send(service);
  });

  app.get("/service/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await allService.findOne(query);
    res.send(result);
  });
} catch {}

app.listen(port, () => {
  console.log(`sinfull server is runing on ${port} `);
});
