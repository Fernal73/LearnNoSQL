#!/usr/bin/env mongo

/* eslint-disable */
db.world.insert({
  "speech": "Hello, World!"
});
let cur = db.world.find();
let x = cur.next();
print(x["speech"]);
db.world.drop();
