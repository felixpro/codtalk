var mongoose = require('mongoose')
var dbconnection = require('../bin/dbconnection');
var Post = require('../models/post')

dbconnection.dbConnect();


var postSchema = new Post({
    autor: "john mcclain",
    title: "Hard to code, the imposible programming path",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    comments: []
}).save(function(err) {
  if (err) {
    console.log("Error when adding new post to the dbs")
    dbconnection.dbDisconnect();
  }
  console.log("Success when adding new post to the dbs")
  dbconnection.dbDisconnect();
})


var postSchema = new Post({
    autor: "Paulo Cohelo",
    title: "The romantic and tragic story of ajax and ruby",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    comments: []
}).save(function(err) {
  if (err) {
    console.log("Error when adding new post to the dbs")
    dbconnection.dbDisconnect();
  }
  console.log("Success when adding new post to the dbs")
  dbconnection.dbDisconnect();
})


var postSchema = new Post({
    autor: "Robert Baratheon",
    title: "The zombie bug, the error without beginning and ends. ",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    comments: []
}).save(function(err) {
  if (err) {
    console.log("Error when adding new post to the dbs")
    dbconnection.dbDisconnect();
  }
  console.log("Success when adding new post to the dbs")
  dbconnection.dbDisconnect();
})


var postSchema = new Post({
    autor: "Daenerys targaryen",
    title: "The JavaScript kindong and the nodejs dragons",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    comments: []
}).save(function(err) {
  if (err) {
    console.log("Error when adding new post to the dbs")
    dbconnection.dbDisconnect();
  }
  console.log("Success when adding new post to the dbs")
  dbconnection.dbDisconnect();
})
