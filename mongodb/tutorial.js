#!/usr/bin/env mongo

function printObj(obj) {
  /* eslint-disable */
  printjson(obj);
  /* eslint-enable */
}

/* eslint-disable */
let conn = new Mongo();
/* eslint-enable */
printObj(conn);
let db = conn.getDB("myDatabase");
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

db = db.getSiblingDB("sampleDB");
