#!/usr/bin/env mongo

function printObj(obj) {
  /* eslint-disable */
  printjson(obj);
  /* eslint-enable */
}

// connect
/* eslint-disable */
let conn = new Mongo();
/* eslint-enable */
printObj(conn);

// drop existing databases
let db = conn.getDB("myDB");
db.dropDatabase();

printObj(db);
db = db.getSiblingDB("sampleDB");
db.dropDatabase();

db = db.getSiblingDB("myDatabase");
printObj(db);
printObj(db.adminCommand("listDatabases"));

db = db.getSiblingDB("test");
printObj(db);
printObj(db.collection.save({
  a: 1
}));

printObj(db.getCollectionNames());

db.collection.find().forEach(printObj);

printObj(db.stats());

db = db.getSiblingDB("myDB");
printObj(db);
printObj(db.adminCommand("listDatabases"));

printObj(db.movie.insert({
  "name": "tutorials point"
}));

db.dropDatabase();
printObj(db.adminCommand("listDatabases"));

db = db.getSiblingDB("myDB");

db.createCollection("mycollection");
printObj(db.getCollectionNames());

db.createCollection("mycol");
printObj(db.getCollectionNames());

db.tutorialspoint.insert({
  "name": "tutorialspoint"
});

printObj(db.getCollectionNames());

db.mycollection.drop();

printObj(db.getCollectionNames());

/* eslint-disable */
db.mycol.insert({
  _id: ObjectId(),
  title: "MongoDB Overview",
  description: "MongoDB is no sql database",
  by: "tutorials point",
  url: "http://www.tutorialspoint.com",
  tags: ["mongodb", "database", "NoSQL"],
  likes: 100
});
/* eslint-enable */

db.mycol.insert([{
  title: "MongoDB Overview",
  description: "MongoDB is no sql database",
  by: "tutorials point",
  url: "http://www.tutorialspoint.com",
  tags: ["mongodb", "database", "NoSQL"],
  likes: 100
}, {
  title: "NoSQL Database",
  description: "NoSQL database doesn't have tables",
  by: "tutorials point",
  url: "http://www.tutorialspoint.com",
  tags: ["mongodb", "database", "NoSQL"],
  likes: 20,
  comments: [{
    user: "user1",
    message: "My first comment",
    dateCreated: new Date(2013, 11, 10, 2, 35),
    like: 0
  }]
},{
  title: "Neo4j Overview",
  description: "Neo4j is no sql database",
  by_user: "Neo4j",
  url: "http://www.neo4j.com",
  tags: ["neo4j", "database", "NoSQL"],
  likes: 750
}]);

db.mycol.find().forEach(printObj);

printObj(db.mycol.findOne());

// RDBMS where clause equivalents

printObj("Where clause equivalents");

printObj("by:tutorials point");
db.mycol.find({
  "by": "tutorials point"
}).forEach(printObj);


printObj("{likes: {$lt:50}}");
db.mycol.find({
  "likes": {
    $lt: 50
  }
}).forEach(printObj);

printObj("{likes: {$lte:50}}");
db.mycol.find({
  "likes": {
    $lte: 50
  }
}).forEach(printObj);

printObj("{likes: {$gt:50}}");
db.mycol.find({
  "likes": {
    $gt: 50
  }
}).forEach(printObj);

printObj("{likes: {$gte:50}}");
db.mycol.find({
  "likes": {
    $gte: 50
  }
}).forEach(printObj);

printObj("{likes: {$ne:50}}");
db.mycol.find({
  "likes": {
    $ne: 50
  }
}).forEach(printObj);

printObj("{$and:[{'by':'tutorials point'},{'title': 'MongoDB Overview'}]}");
db.mycol.find({
  $and: [{
    "by": "tutorials point"
  }, {
    "title": "MongoDB Overview"
  }]
}).forEach(printObj);

printObj("{$or:[{'by':'tutorials point'},{'title': 'MongoDB Overview'}]}");
db.mycol.find({
  $or: [{
    "by": "tutorials point"
  }, {
    "title": "MongoDB Overview"
  }]
}).forEach(printObj);

printObj("{'likes': {$gt: 10},$or: [{'by': 'tutorials point'}, {'title': 'MongoDB Overview'}]}");
db.mycol.find({
  "likes": {
    $gt: 10
  },
  $or: [{
    "by": "tutorials point"
  }, {
    "title": "MongoDB Overview"
  }]
}).forEach(printObj);

printObj("Update data");
db.mycol.update({
  title: "NoSQL Database"
}, {
  $set: {
    title: "NoSQL DataBase"
  }
});
db.mycol.find().forEach(printObj);

printObj("multi Update data");
db.mycol.update({
  title: "MongoDB Overview"
}, {
  $set: {
    title: "MongoDB Tutorial"
  }
}, {
  multi: true
});

db.mycol.find().forEach(printObj);

printObj("save new data");
let obj = db.mycol.find().limit(1);
let vals = obj.toArray();
let id = vals[0]._id;
db.mycol.save({
  "_id": id,
  "title": "Tutorials Point New Topic",
  "by": "Tutorials Point"
});
db.mycol.find().forEach(printObj);

printObj("remove data");
printObj("remove data will not work with capped collections");
db.mycol.remove({
  "title": "MongoDB Overview"
});
db.mycol.find().forEach(printObj);

db.mycol.find({}, {
  "title": 1,
  _id: 0
}).forEach(printObj);

db.mycol.find({}, {
  "title": 1,
  _id: 0
}).limit(2).forEach(printObj);

db.mycol.find().sort({
  KEY: 1
}).forEach(printObj);

db.mycol.find({}, {
  "title": 1,
  _id: 0
}).sort({
  "title": -1
}).forEach(printObj);

db.mycol.ensureIndex({
  "title": 1
});

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]).forEach(printObj);

db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]).forEach(printObj);
db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]).forEach(printObj);
