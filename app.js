var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var exphbs  = require('express-handlebars');



var app = express();
// mongoDB config
var mongoDB = ' mongodb://fpuj:f2367564@codtalk-shard-00-00.fvhwn.mongodb.net:27017,codtalk-shard-00-01.fvhwn.mongodb.net:27017,codtalk-shard-00-02.fvhwn.mongodb.net:27017/codTalk?ssl=true&replicaSet=atlas-12uwqv-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect (mongoDB, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log("Error when connection to DB")
  }
  console.log("db working perfect")
});
mongoose.Promise = global.Promise;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs'
}))

app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
