var mongoose = require('mongoose');

var carteleraSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idSala: mongoose.Schema.Types.ObjectId,
  idCine: mongoose.Schema.Types.ObjectId,
  horario: String,
  fechaFin: String,
  fechaIni: String,
  tipo: String,
  idPelicula: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Catelera', carteleraSchema, 'Carteleras');