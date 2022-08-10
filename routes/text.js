const express = require("express");
const router = express.Router();
const client = require("../db/dbconn");

const ObjectId = require("mongodb").ObjectId;

// Show user's all texts
router.route("/text").post(function (req, res) {
  let req_googleId = req.body.req_googleId;
  let db_connect = client.db("svcms");
  db_connect
    .collection("texts")
    .find({ googleId: req_googleId })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Show all public texts
router.route("/public").get(function (req, res) {
  let db_connect = client.db("svcms");
  db_connect
    .collection("texts")
    .find({ status: "public" })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Show one text
router.route("/text/:id").get(function (req, res) {
  let db_connect = client.db();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("texts").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Add one text
router.route("/text/add").post(function (req, response) {
  let db_connect = client.db();
  let myobj = {
    googleId: req.body.googleId,
    username: req.body.username,
    title: req.body.title,
    status: req.body.status,
    date: Date(),
    content: req.body.content,
  };
  db_connect.collection("texts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("1 document added", req.body);
    response.json(res);
  });
});

// Update one text
router.route("/update/:id").patch(function (req, response) {
  let db_connect = client.db();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      googleId: req.body.googleId,
      title: req.body.title,
      status: req.body.status,
      date: Date(),
      content: req.body.content,
    },
  };
  console.log(req.body.blocks);
  db_connect
    .collection("texts")
    .updateOne(myquery, newvalues, { upsert: true }, function (err, res) {
      if (err) console.log("Cannot update because: ${err}");
      console.log("1 document updated");
      response.json(res);
    });
});

// Delete one text
router.route("/:id").delete((req, response) => {
  let db_connect = client.db();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("texts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = router;
