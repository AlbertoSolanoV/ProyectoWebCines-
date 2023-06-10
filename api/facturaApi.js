var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Factura = require('../schemas/facturasSchemas');

router.post('/buscarFactura', function (req, res) {

  let _id = req.body.id;

  Factura.find({
    _id: _id
  }, (err, Factura) => {
    if (err) {
      return res.json(Factura);
    } else {
      return res.json(Factura);
    }
  })


});

router.post('/insertar', function (req, res) {
  var facturaNueva = new Factura({
    _id: new mongoose.Types.ObjectId(),
    total: req.body.total,
    subTotal: req.body.subTotal,
    iva: req.body.iva,
    servicio: req.body.servicio,
    idCliente: req.body.idCliente

  });
  facturaNueva.save((err, factura) => {
    if (err) {
      res.json(factura);
    } else {
      console.log(factura);
      res.json(factura);
    } 
  }); 
});

module.exports = router;