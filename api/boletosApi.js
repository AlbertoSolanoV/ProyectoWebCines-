var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Boleto = require('../schemas/boletosSchema.js');

router.post('/buscarboletos', function (req, res) {

  let idUser = req.body.id;

  Boleto.find({
    idUser: idUser
  }, (err, Boleto) => {
    if (err) {
      return res.json(Boleto);
    } else {
      return res.json(Boleto);
    }
  })


});

router.post('/insertar', function (req, res) {
  var BoletoNueva = new Boleto({
    _id: new mongoose.Types.ObjectId(),
    idCartelera: req.body.idCartelera,
    idUser: req.body.idUser,
    idButaca: req.body.idButaca

  });
  BoletoNueva.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar tarjeta');
    } else {
      res.status(200).send('Registrada con exito');
    }
  });
});

module.exports = router;