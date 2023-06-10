var mongoose = require('mongoose');

var boletoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idCartelera: mongoose.Schema.Types.ObjectId,
  idUser: mongoose.Schema.Types.ObjectId,
  idButaca: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Boleto', boletoSchema, 'Boletos');