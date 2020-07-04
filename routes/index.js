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
      console.log("Error when retreving the posts  " + err)
    }


    res.render('index', { posts: posts, messages: req.flash('info')});


  })
});


router.get('/post/:id', function(req, res, next) {
    var postId = req.params.id;
    Post.findOne({_id: postId}, function(err, post) {
      if (err) {
        console.log("Error when retreving the posts  " + err)
      }
    })
    .populate('comments')
    .exec(function(err, post) {

      var postObj = Object.assign({}, post.comments);

      console.log(postObj)



      res.render('post', {myPost: post, postId:post._id, comments: postObj});

    });


    // como pa
});

router.get('/delete/:id', function (req, res) {
  var postId = req.params.id;
  Post.findOne({_id: postId}, function(err, post) {
    if (err) {
      console.log("Error when retreving the posts  " + err)
    }
    post.delete()
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error("Error al eliminar"))
  })
})



router.get('/forms/post-form', function(req, res, next) {
  res.render('forms/post-form', { });
});

router.post('/forms/post-form', function(req, res, next) {
    // basic validation
      new Post({
          autor: req.body.autor,
          title: req.body.title,
          text: req.body.text,
          comments: []
      }).save(function(err) {
        if (err) {
          console.log("Error when adding new post to the dbs")

        } else {
          Post.findOne({text: req.body.text, title:req.body.title}, function(err, post) {
            if (err) {
              console.log("Error when retreving the posts  " + err)
            }
            console.log(req.body.text)
            res.render('post', {myPost: post });
          })
        }
      })
});

router.post('/forms/comment/:id', function(req, res, next) {
  var autor = req.body.autor;
  var comment = req.body.comment;
  var postId = req.params.id;

  new Comment({
      autor: autor,
      text: comment,
  }).save()
  .then(newCommment => {
    Post.findOne({_id:postId},function(err, post) {
      if (err) {
        console.log("Error searching the post   "  +  err)
      }
        post.comments.push(newCommment);
        post.save(function(err) {
          if (err) {
            console.log("Error traying to update the info   " + err)
          }
          res.redirect('/post/' + postId)
        })
    })
   })
   .catch(error => console.error("Error al eliminar"))



});




module.exports = router;
