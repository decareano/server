const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicom = require('serve-favicon');
const fetch = require("node-fetch");

//const API_URL = "http://localhost:3000/api/v1/stickers";





const app = express();
const stickers = require('./api/stickers')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//this route has to be here. NOT somewhere else. bet middleware and error handling

app.use('/api/v1/stickers', stickers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  	message: err.message,
  	error: req.app.get('env') === 'development' ? err : {}
  })
});

module.exports = app;
