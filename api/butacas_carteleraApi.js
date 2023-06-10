var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Butaca_Cartelera = require('../schemas/butaca_carteleraSchema.js');

router.get('/listar', function (req, res) {
  Butaca_Cartelera.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/insertar', function (req, res) {
  var butacaCartelera = new Butaca_Cartelera({
    _id: new mongoose.Types.ObjectId(),
    idButaca: req.body.idButaca,
    idCartelera: req.body.idCartelera,
    estado: "1"

  });
  butacaCartelera.save()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/buscarButacas', function (req, res) {

  let idCartelera = req.body.idCartelera;

  Butaca_Cartelera.find({
    idCartelera: idCartelera
  }, (err, Butacas) => {
    if (err) {
      return res.json(Butacas);
    } else {
      return res.json(Butacas);
    }
  })


});

router.put('/modificar', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    estado: "0"
  };
  Butaca_Cartelera.findOneAndUpdate(datos, actualizar, function (err) {
    if (err) {
      res.status(500).send('Error al actualizar butaca');

    } else {
      res.status(200).send('Butaca actualizada con exito');
    }
  });
});


module.exports = router;