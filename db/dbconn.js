const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "../" });

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect(function (err) {
  console.log("MongoDB started!");
});

module.exports = client;
