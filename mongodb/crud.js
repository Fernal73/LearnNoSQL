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
  name: "Thomas",
  age: 45
}, {
  name: "Tim",
  age: 28
}, {
  name: "Jim",
  age: 28
}, {
  name: "Jim",
  age: 38
}, {
  name: "John",
  age: 25
}, {
  name: "Kathy",
  age: 23
}]);

//Will replace only first matching
db.people.updateOne({name: "Thomas"},{$set: {age: 69, name: "Tom"}});
db.people.updateMany({name: "Jim"},{$set:{name: "James"}});
db.people.updateMany({name: "Kathy"},{$set:{age: 30, salary:50000}});
db.people.replaceOne({name:"John"}, {name:"Lakmal",age:25,address:"Sri Lanka"});
db.people.find().forEach(printjson);
db.people.drop();
