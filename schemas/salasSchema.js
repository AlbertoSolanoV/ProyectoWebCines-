var mongoose = require('mongoose');

var salaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipo: String,
  cantidadButacas:String,
  idCine:  mongoose.Schema.Types.ObjectId,
  estado: String
});

module.exports = mongoose.model('Sala', salaSchema, 'Salas');