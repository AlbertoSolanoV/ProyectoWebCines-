var mongoose = require('mongoose');

var cineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  localizacion: String,
  logo: String,
  estado: String
});


module.exports = mongoose.model('Cine', cineSchema, 'Cines');