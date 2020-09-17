var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testUidRouter = require('./routes/testUid');
var shopDetailRouter = require('./routes/shop');
var addOrderRouter = require('./routes/order');
var addDiscussRouter = require('./routes/discuss');
var movieRouter = require('./routes/movie');

var app = express();

// const config = require('./config/db.json')
// console.log(config.db.host)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/node1', indexRouter);
app.use('/users', usersRouter);
// ---
app.use('/node1/testUid', testUidRouter);
app.use('/node1/shop', shopDetailRouter);
app.use('/node1/order', addOrderRouter);
app.use('/node1/discuss', addDiscussRouter);
app.use('/node1/movie', movieRouter);

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
