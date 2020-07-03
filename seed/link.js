var mongoose = require('mongoose')
var dbconnection = require('../bin/dbconnection');
var Comment = require('../models/comment')
var Post = require('../models/post')

dbconnection.dbConnect();


Comment.findOne({_id: "5efdf37602054c0ba98e032c"},function(err, comment) {
    if (err) {
      console.log("Error traying to get comment" + err)
    }

    Post.findOne({_id:"5efdf0462c7ddd0aec1faedc"},function(err, post) {
      if (err) {
        console.log("Error searching the post   "  +  err)
      }
        post.comments.push(comment);
        post.save(function(err) {
          if (err) {
            console.log("Erro traying to update the info   " + err)
          }
          mongoose.disconnect();

        })
    })
});
