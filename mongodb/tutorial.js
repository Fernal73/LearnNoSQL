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
printObj(db.collection.save( { a: 1 }));

printObj(db.getCollectionNames());

var cursor = db.collection.find();
var documentArray = cursor.toArray();
var doc = documentArray[0];
printObj(doc);

printObj(db.stats());

db = db.getSiblingDB("myDB");
printObj(db);
printObj(db.adminCommand("listDatabases"));

printObj(db.movie.insert({"name":"tutorials point"}));

db.dropDatabase();
printObj(db.adminCommand("listDatabases"));


db = db.getSiblingDB("test");

db.createCollection("mycollection");
printObj(db.getCollectionNames());
