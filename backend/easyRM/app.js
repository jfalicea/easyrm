var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//non-express libraries 
const helmet = require('helmet')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const vendorRouter = require('./routes/vendor')

var app = express();
//security 
app.use(helmet())

//CORS - Header Info  --> Need to update once complete!!
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vendors', vendorRouter);

module.exports = app;
