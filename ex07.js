var mongo = require('mongodb').MongoClient;

var dbName = process.argv[2];
var collectionName = process.argv[3];
var removeId = process.argv[4];
var url = 'mongodb://localhost:27017/' + dbName;


mongo.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  }
  var database = db.collection(collectionName);
  database.remove({
    _id: removeId
  }, function(err, data) {
    if (err) {
      console.log(err);
    }
    db.close();
  });
})
