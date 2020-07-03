var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')
var Post = require('../models/post')
var dbconnection = require('../bin/dbconnection');

dbconnection.dbConnect();

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find( function(err, posts) {
    if (err) {
      console.log("Error when retreving the posts")
    }
    res.render('index', { posts: posts });

  })
});


router.get('/post/:id', function(req, res, next) {
    var postId = req.params.id;
    Post.findOne({_id: postId}, function(err, post) {
      if (err) {
        console.log("Error when retreving the posts  " + err)
      }
      console.log(post)
      res.render('post', {myPost: post });
    })
});

module.exports = router;
