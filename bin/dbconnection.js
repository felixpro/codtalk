var mongoose = require('mongoose');



exports.dbConnect = function () {
  var mongoDB = "mongodb://fpuj:f2367564@codtalk-shard-00-00.fvhwn.mongodb.net:27017,codtalk-shard-00-01.fvhwn.mongodb.net:27017,codtalk-shard-00-02.fvhwn.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-12uwqv-shard-0&authSource=admin&retryWrites=true&w=majority";
  mongoose.connect (mongoDB, { useNewUrlParser: true }, function(err) {
    if (err) {
      console.log("Error when connection to DB")
    }else {
      console.log("db working perfect")

    }
  });
};


exports.dbDisconnect = function () {
  mongoose.disconnect();
};
