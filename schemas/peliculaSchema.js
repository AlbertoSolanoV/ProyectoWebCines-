var mongoose = require('mongoose');

var peliculaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: String,
  duracion: String,
  categoria: String,
  clasificacion: String,
  img: String,
  sinopsis: String
});


module.exports = mongoose.model('Pelicula', peliculaSchema, 'Peliculas');