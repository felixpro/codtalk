var mongoose = require('mongoose')
var dbconnection = require('../bin/dbconnection');
var Comment = require('../models/comment')

dbconnection.dbConnect();


var commentSchema = new Comment({
    autor: "Luna park",
    text: "I loved your post, for me JavaScript is the best language even if is confuse at sometimes",
}).save(function(err) {
  if (err) {
    console.log("Error when adding new comment to the dbs")
    dbconnection.dbDisconnect();
  }
  console.log("Success when adding new comment to the dbs")
  dbconnection.dbDisconnect();
})
