var express = require('express');
var router = express.Router();
var Comment = require('../models/comment')
var Post = require('../models/post')
var dbconnection = require('../bin/dbconnection');
var { body, validationResult } = require('express-validator');
var url = require('url');


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
    var loro =
    Post.findOne({_id: postId}, function(err, post) {
      if (err) {
        console.log("Error when retreving the posts  " + err)
      }
    })
    .populate('comments').sort()
    .exec(function(err, post) {
    res.render('post', {myPost: post, postId:post._id, comments: post.comments});
    });
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
    // Validation
    req.checkBody('autor')
    .notEmpty().withMessage('Autor is empty ')
    .isLength({ max: 30 }).withMessage('Autor must be less than 30 chars long ')
    req.checkBody('title')
    .notEmpty().withMessage('Title is empty ')
    .isLength({ max:80 }).withMessage('Title must be less than 80 chars long ')
    req.checkBody('text')
    .notEmpty().withMessage('Post text is empty ')
    .isLength({ min:100}).withMessage('Text must contain more than 80 chars ')

    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
           errors.forEach(function(error) {
           messages.push(error.msg);
        });
        console.log(messages)
        res.render('forms/post-form', {messages: messages});
    }else {
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
            res.render('post', {myPost: post, postId:post._id });
          })
        }
      })
    }


});

router.post('/forms/comment/:id', function(req, res, next) {
  var comment_autor = req.body.comment_autor;
  var comment = req.body.comment;
  var postId = req.params.id;

  req.checkBody('comment_autor')
  .notEmpty().withMessage('Autor is empty ')
  .isLength({ max: 30 }).withMessage('Autor must be less than 30 chars long')
  req.checkBody('comment')
  .notEmpty().withMessage('Post text is empty')
  .isLength({ max:150}).withMessage('Text must contain les than 150 chars')
  var errors = req.validationErrors();

  if (errors) {
      var messages = [];
         errors.forEach(function(error) {
         messages.push(error.msg);
      });
      // using url to pass data to the redirect
      res.redirect(url.format({
       pathname:"/comment/redirect",
       query: {
          "messagesObj": messages,
          "postId": postId
        }
     }));

  }else {
    new Comment({
        autor: comment_autor,
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
  }
});

// As redirect doesnt allow parameters, I redirected to this route and after that render the post view
router.get('/comment/redirect', function(req, res) {
  var messages = req.query.messagesObj
  var postId = req.query.postId;

  console.log(postId)

  Post.findOne({_id: postId}, function(err, post) {
    if (err) {
      console.log("Error when retreving the posts  " + err)
    }
  })
  .populate('comments')
  .exec(function(err, post) {
    var postObj = Object.assign({}, post.comments)
    res.render('post', {myPost: post, postId:post._id, comments: postObj, messages:messages });
  });
})

// delete comments
router.get('/delete/comments/:id', function(req, res, next) {
  var commentId = req.params.id
  res.send(commentId)
});



module.exports = router;
