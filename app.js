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


const init = async () => {
  while (new Date().toFormat('HH24') !== "00");

  const postValue = new Post();

  postValue.id = id;
  postValue.date = getCurrentDate();
  
  await postValue.save(function(err, postvalue){
    if (err)
      return console.log(err);
      
    console.log("Create Success");
  });

  await sleep(86390000); // 23시간 59분 50초 대기
}

const sleep = (ms) => {
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}

const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  collection_name=year.toString()+month.toString()+today.toString();
  return collection_name;
}

while (true)
  init();

module.exports = app;
