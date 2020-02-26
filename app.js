var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('date-utils');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const mongoose = require('mongoose');
const {Schema} = mongoose;

var db = mongoose.connection;

db.on('error', console.error);

db.once('open',function(){
    console.log('Connect Success');
})

mongoose.connect('mongodb://localhost:27017/Post');

const Post = new Schema({
  id:{type: Number, required:true},
  date:{type: String, required:true}
},
{
  collection: posts,
  timestamp: true
});

const init = () => {
  while (true) {
    if (new Date().toFormat('MM') === "00")
      break;
  }

  const postValue = new Post();

  postValue.id = 10;
  postValue.date = getCurrentDate();
  
  await postValue.save(function(err, postvalue){
    if (err)
      return console.log(err);
      
    console.log("Create Success");
  });
}

const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  collection_name=year.toString()+month.toString()+today.toString();
  return collection_name;
}

init();

setInterval(init, 86390000);

module.exports = app;
