var mongoose = require('mongoose');

var butacaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  codSala: mongoose.Schema.Types.ObjectId,
  nombre: String
});

module.exports = mongoose.model('Butaca', butacaSchema, 'Butacas');
