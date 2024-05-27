var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

var mongoDB = "mongodb+srv://patcharawealth:yAdgC7BbXPuSAkrT@expressapi.gyq6qm9.mongodb.net/?retryWrites=true&w=majority&appName=ExpressAPI";
// var mongoDB = "mongodb+srv://patcharawealth:<password>@expressapi.gyq6qm9.mongodb.net/?retryWrites=true&w=majority&appName=ExpressAPI";
mongoose.connect(mongoDB)
        .then(() => console.log('mongoDB Connect Success'))
        .catch((err) => console.log('Error To Connect!!!'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5174'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/products', productsRouter);

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
