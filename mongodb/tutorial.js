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

db.createCollection("mycol", {
  capped: true,
  autoIndexId: true,
  size: 6142800,
  max: 10000
});
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
  title: "MongoDB Overview"
}, {
  $set: {
    title: "New MongoDB Tutorial"
  }
});
db.mycol.find().forEach(printObj);

printObj("multi Update data");
db.mycol.update({
  title: "NoSQL Database"
}, {
  $set: {
    title: "NoSQL DB Tutorial"
  }
}, {
  multi: true
});

db.mycol.find().forEach(printObj);
