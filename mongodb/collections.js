#!/usr/bin/env mongo

/* eslint-disable */
db = db.getSiblingDB("myDB");

printjson(db.getCollectionNames());
db.createCollection("newCollection1");


db.createCollection("newCollection4", {capped :true, autoIndexId : true, size : 6142800, max :
  10000});
printjson(db.getCollectionNames());

db.newCollection4.drop();
db.newCollection1.drop();
printjson(db.getCollectionNames());
