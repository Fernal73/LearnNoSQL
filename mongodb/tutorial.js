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

