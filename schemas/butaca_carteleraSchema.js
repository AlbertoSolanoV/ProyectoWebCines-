var mongoose = require('mongoose');

var butaca_carteleraSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idButaca: mongoose.Schema.Types.ObjectId,
  idCartelera: mongoose.Schema.Types.ObjectId,
  estado: String
});

module.exports = mongoose.model('Butaca_Cartelera', butaca_carteleraSchema, 'Butacas-Carteleras');
