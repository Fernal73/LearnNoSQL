#!/usr/bin/env mongo

/* eslint-disable */

db.people.insertOne({
  name: "Tom",
  age: 28
});

var cursor = db.people.find();
var recs = cursor.toArray();
var id = recs[0]._id;


db.people.save({
  _id: id,
  name: "Thomas",
  age: 30
});

db.people.insertMany([{
  name: "Tim",
  age: 28
}, {
  name: "John",
  age: 25
}, {
  name: "Kathy",
  age: 23
}]);
db.people.find().forEach(printjson);
db.people.drop();
