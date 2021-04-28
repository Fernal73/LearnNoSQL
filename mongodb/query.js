#!/usr/bin/env mongo

/* eslint-disable */
db.students.insertMany([{
    "studentNo": 1,
    "firstName": "Prosen",
    "lastName": "Ghosh",
    "age": 25
  }, {
    "studentNo": 2,
    "firstName": "Rajib",
    "lastName": "Ghosh",
    "age": 25
  },
  {
    "studentNo": 3,
    "firstName": "Rizve",
    "lastName": "Amin",
    "age": 23
  },
  {
    "studentNo": 4,
    "firstName": "Jabed",
    "lastName": "Bangali",
    "age": 25
  },
  {
    "studentNo": 5,
    "firstName": "Gm",
    "lastName": "Anik",
    "age": 23
  }
]);

db.students.find({}).forEach(printjson);

db.students.find({
  firstName: "Prosen"
}).forEach(printjson);

db.students.find({
  "firstName": "Prosen",
  "age": {
    "$gte": 23
  }
}).forEach(printjson);

db.students.find({
  "$or": [{
    "firstName": "Prosen"
  }, {
    "age": {
      "$gte": 23
    }
  }]
}).forEach(printjson);

db.students.find({
  firstName: "Prosen",
  $or: [{
      age: 23
    },
    {
      age: 25
    }
  ]
}).forEach(printjson);

db.students.find({lastName : {
  $in: ["Ghosh", "Amin"]
}}).forEach(printjson);

db.students.find({},{age:0}).forEach(printjson);
db.students.find({},{age:1}).forEach(printjson);
db.students.find({},{name:1,_id:0}).forEach(printjson);
db.students.drop();

db.test.insertMany([
 {name:"Any", age:"21", status:"busy"},
 {name:"Tony", age:"25", status:"busy"},
 {name:"Bobby", age:"28", status:"online"},
 {name:"Sonny", age:"28", status:"away"},
 {name:"Cher", age:"20", status:"online"}
]);

db.test.find({}).forEach(printjson);
db.test.find({}).skip(3).forEach(printjson);
db.test.find({}).sort({ "name" : -1}).forEach(printjson);
db.test.find({}).sort({ "name" : 1}).forEach(printjson);
print(db.test.find({}).count());

db.test.find({}).sort({ "name" : -1}).skip(1).limit(2).forEach(printjson);


db.test.remove({});
