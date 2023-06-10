var mongoose = require('mongoose');

var margenSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idCine: mongoose.Schema.Types.ObjectId,
  mes: String,
  porcentajeIva: String,
  porcentajeGana: String,
  gananciaCadena: String,
  gananciaTotal: String
});


module.exports = mongoose.model('Margen', margenSchema, 'Margenes');