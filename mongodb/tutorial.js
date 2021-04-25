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

var cursor = db.collection.find();
var documentArray = cursor.toArray();
var doc = documentArray[0];
printObj(doc);

printObj(db.stats());

db = db.getSiblingDB("myDB");
printObj(db);
printObj(db.adminCommand("listDatabases"));

printObj(db.movie.insert({
  "name": "tutorials point"
}));

db.dropDatabase();
printObj(db.adminCommand("listDatabases"));


db = db.getSiblingDB("test");

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

db.post.insert([{
  title: "MongoDB Overview",
  description: "MongoDB is no sql database",
  by: "tutorials point",
  url: "http://www.tutorialspoint.com",
  tags: ["mongodb", "database", "NoSQL"],
  likes: 100
},{
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
}
]);
