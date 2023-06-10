var mongoose = require('mongoose');

var user_cineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idUser: mongoose.Schema.Types.ObjectId,
  idCine:mongoose.Schema.Types.ObjectId,
  
});


module.exports = mongoose.model('User_cine', user_cineSchema, 'User-cine');