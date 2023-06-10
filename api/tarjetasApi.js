var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Tarjeta = require('../schemas/tarjetaSchema.js');

router.get('/listar', function (req, res) {
  Tarjeta.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/obtener', function (req, res) {
  const {
    idCliente
  } = req.body;
  console.log(idCliente);
  Tarjeta.find({
    idCliente
  }, (err, tarjeta) => {
    if (err) {
      res.json(tarjeta);
    } else {
      console.log(tarjeta);
      res.json(tarjeta);
    }
  }); 
});

router.post('/insertar', function (req, res) {
  var tarjetaNueva = new Tarjeta({
    _id: new mongoose.Types.ObjectId(),
    idCliente: req.body._id,
    NumTrajeta: req.body.NumTrajeta,
    NombreTarjeta: req.body.NombreTarjeta,
    Vence: req.body.Vence,
    ccv: req.body.ccv,
    ultDig: req.body.ultDig
  });
  tarjetaNueva.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar tarjeta');
    } else {
      res.status(200).send('Registrada con exito');
    }
  });
});

router.delete('/eliminar', function (req, res) {

  var id = req.body.id;
  Tarjeta.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      res.status(500).send('Error al eliminar tarjeta');
    } else {
      res.status(200).send('Eliminada con exito');
    }
  });
});

module.exports = router;