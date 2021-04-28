#!/usr/bin/env mongo

/* eslint-disable */
printjson(db.getCollectionNames());

printjson(db.adminCommand("listDatabases"));

printjson(db.getMongo().getDBNames());
