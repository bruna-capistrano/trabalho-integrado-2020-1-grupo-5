var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var timesRouter = require('./routes/times');
var admsRouter = require('./routes/adms');
var jogadoresRouter = require('./routes/jogadores');
var partidasRouter = require('./routes/partidas');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/futadm';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Conectado ao MongoDB!");
}, (err) => { console.log(err); });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/times', timesRouter);
app.use('/adms', admsRouter);
app.use('/jogadores', jogadoresRouter);
app.use('/partidas', partidasRouter);

module.exports = app;