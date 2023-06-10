var mongoose = require('mongoose');

var facturaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  total: String,
  subTotal: String,
  iva: String,
  servicio:String,
  idCliente: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Factura', facturaSchema, 'Facturas');
