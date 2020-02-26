const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id:{type: Number, required:true},
  date:{type: String, required:true},
},
{
  collection:"posts",
  timestamp:false
});

module.exports = mongoose.model('Post', postSchema);