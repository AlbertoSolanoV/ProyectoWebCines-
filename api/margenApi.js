var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Margen = require('../schemas/margenSchema.js');

router.get('/listar', function (req, res) {
  Margen.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/buscarMargen', function (req, res) {

  let idCine = req.body.idCine;

  Margen.find({
    idCine: idCine
  }, (err, Margen) => {
    if (err) {
      return res.json(Margen);
    } else {
      return res.json(Margen);
    }
  })


});

router.post('/insertar', function (req, res) {
   var margenNuevo = new Margen({
    _id: new mongoose.Types.ObjectId(),
    cine: req.body.nombre,
    mes: req.body.carrera,
    iva: req.body.edad,
    porcentaje: req.body.nombre,
    gananciaCade: req.body.carrera,
    gananciaTotal: req.body.edad,

  });
  margenNuevo.save()
    .then(function (result) {
      res.json(result);
    });
})

router.put('/modificar', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    porcentajeGana: req.body.porcentaje,
    gananciaTotal: req.body.gananciaTotal
  };
  Margen.findOneAndUpdate(datos, actualizar, function (err) {
    if (err) {
      res.status(500).send('Error al actualizar ganancia');

    } else {
      res.status(200).send('Ganancias actualizadas con éxito');
    }
  });
});

module.exports = router;