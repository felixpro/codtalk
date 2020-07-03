var mongoose = require('mongoose');



exports.dbConnect = function () {
  var mongoDB = "mongodb://fpuj:123@cluster0-shard-00-00.xb5mg.mongodb.net:27017,cluster0-shard-00-01.xb5mg.mongodb.net:27017,cluster0-shard-00-02.xb5mg.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-lkw1z2-shard-0&authSource=admin&retryWrites=true&w=majority";
  mongoose.connect (mongoDB, { useNewUrlParser: true }, function(err) {
    if (err) {
      console.log("Error when connection to DB")
    }
    console.log("db working perfect")
  });
};


exports.dbDisconnect = function () {
  mongoose.disconnect();
};
