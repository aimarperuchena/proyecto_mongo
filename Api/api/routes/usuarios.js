var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;


/* GET users listing. */
router.get("/", function (req, res, next) {
  MongoClient.connect(process.env.DB_HOST, function (err, client) {
    if (err) throw err;

    var db = client.db("usuarios");

    db.collection("usuarios")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;

        res.json(result);
        client.close();
      });
  });
});

router.get("/:id", function (req, res, next) {
  const ObjectId = require('mongodb').ObjectId; 
  MongoClient.connect(process.env.DB_HOST, function (err, client) {
    if (err) throw err;

    var db = client.db("usuarios");

    db.collection("usuarios")
      .find({ _id: ObjectId(req.params.id)})
      .toArray(function (err, result) {
        if (err) throw err;

        res.json(result);
        client.close();
      });
  });
});

router.post("/", function (req, ress, next) {
  MongoClient.connect(process.env.DB_HOST, function (err, client) {
    if (err) throw err;

    var db = client.db("usuarios");
    var myobj = { name: req.body.name, surname: req.body.surname };
    db.collection("usuarios").insertOne(myobj, function(err, res) {
      if (err) throw err;
      ress.json({status:true})
      client.close();
    });
  });
});
router.put("/:id", function (req, ress, next) {
  const ObjectId = require('mongodb').ObjectId; 
  MongoClient.connect(process.env.DB_HOST, function (err, client) {
    if (err) throw err;

    var db = client.db("usuarios");
   
    var newvalues = { $set: { name: req.body.name, surname: req.body.surname } };
    db.collection("usuarios").updateOne({ _id: ObjectId(req.params.id)},newvalues, function(err, res) {
      if (err) throw err;
      ress.json({status:true})
      client.close();
    });
  });
});

router.delete("/:id", function (req, ress, next) {
  const ObjectId = require('mongodb').ObjectId; 
  MongoClient.connect(process.env.DB_HOST, function (err, client) {
    if (err) throw err;

    var db = client.db("usuarios");
   

    db.collection("usuarios").deleteOne({ _id: ObjectId(req.params.id)}, function(err, res) {
      if (err) throw err;
      ress.json({status:true})
      client.close();
    });
  });
});

module.exports = router;
