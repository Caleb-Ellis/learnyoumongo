var mongo = require('mongodb').MongoClient;

var sizeQuery = process.argv[2];
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
  if (err) {
    console.log(err);
  }
  var prices = db.collection('prices');
  prices.aggregate([
    { $match: {
      size: sizeQuery
    }},
    { $group: {
      _id: 'average',
      average: {
        $avg: '$price'
      }
    }}
  ]).toArray(function(err, results) {
    if (err) {
      console.log(err);
    }
    var avg = results[0]
    console.log(Number(avg.average).toFixed(2))
    db.close()
  })
})
