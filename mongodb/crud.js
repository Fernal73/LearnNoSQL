#!/usr/bin/env mongo

/* eslint-disable */

db.people.insertOne({
  name: "Tom",
  age: 28
});

var cursor = db.people.find();
var recs = cursor.toArray();
var id = recs[0]._id;


db.people.save({
  _id: id,
  name: "Thomas",
  age: 30
});

db.people.insertMany([{
  name: "Thomas",
  age: 45,
  siblings: ["Marie", "Bob", "Kevin", "Alex"]
}, {
  name: "Tim",
  age: 28,
  marks: [50, 60, 70]
}, {
  name: "Jim",
  age: 28
}, {
  name: "Jim",
  age: 38
}, {
  name: "John",
  age: 25,
  marks: [{
      subject: "English",
      marks: 90
    }, {
      subject: "Maths",
      marks: 100
    },
    {
      subject: "Computes",
      marks: 20
    }
  ]
}, {
  name: "Kathy",
  age: 23,
  address: {
    country: "US",
    city: "Los Angeles"
  }
}]);

//Will replace only first matching
db.people.updateOne({
  name: "Thomas"
}, {
  $set: {
    age: 69,
    name: "Tom"
  }
});
db.people.updateMany({
  name: "Jim"
}, {
  $set: {
    name: "James"
  }
});
db.people.updateMany({
  name: "Kathy"
}, {
  $set: {
    age: 30,
    salary: 50000
  }
});
db.people.replaceOne({
  name: "John"
}, {
  name: "Lakmal",
  age: 25,
  address: "Sri Lanka",
  marks: [{
      subject: "English",
      marks: 90
    }, {
      subject: "Maths",
      marks: 100
    },
    {
      subject: "Computes",
      marks: 20
    }
  ]
});

db.people.updateOne({
  name: "Tim",
  marks: 50
}, {
  "$set": {
    "marks.$": 55
  }
});

db.people.updateOne({
  name: "Lakmal",
  "marks.subject": "English"
}, {
  "$set": {
    "marks.$.marks": 85
  }
});

db.people.update({
  name: "Thomas"
}, {
  $push: {
    nicknames: "Tommy"
  }
});
db.people.update({
  name: "Thomas"
}, {
  $pull: {
    nicknames: "Tommy"
  }
});

db.people.update({
  name: "Thomas"
}, {
  $pop: {
    siblings: -1
  }
});
db.people.update({
  name: "Thomas"
}, {
  $pop: {
    siblings: 1
  }
});

db.people.find({
  name: "Thomas"
}).forEach(printjson);
printjson(db.people.findOne({
  name: "Tom"
}));
db.people.find({
  name: "Tom"
}, {
  _id: 0,
  age: 1
}).pretty();
db.people.find({
  name: "Kathy"
}, {
  _id: 0,
  age: 1
}).pretty();

db.people.find({
  "address.country": "US"
}).pretty();

db.people.find({
  "address.country": "US"
}, {
  "name": true,
  "address.city": true
}).pretty();

// New in MongoDB 3.2
db.people.deleteOne({
  name: "Tom"
});

db.people.deleteMany({
  name: "Tom"
});

db.people.remove({});

db.people.find().forEach(printjson);
db.people.drop();

db.students.insertMany([{
  "_id": 1,
  "grades": [80, 85, 90]
}, {
  "_id": 2,
  "grades": [88, 90, 92]
}, {
  "_id": 3,
  "grades": [85, 100, 90]
}]);

db.students.update({
  _id: 1,
  grades: 80
}, {
  $set: {
    "grades.$": 82
  }
});

db.students.find().forEach(printjson);
db.students.drop();
