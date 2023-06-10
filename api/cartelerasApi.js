var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Cartelera = require('../schemas/carteleraSchema.js');

router.get('/listar', function (req, res) {
  Cartelera.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/insertar', function (req, res) {
  var nuevaCartelera = new Cartelera({
    _id: new mongoose.Types.ObjectId(),
    idSala: req.body.idSala,
    idCine: req.body.idCine,
    horario: req.body.horario,
    fechaFin: req.body.fechaFin,
    fechaIni: req.body.fechaIni,
    tipo: req.body.tipo,
    idPelicula: req.body.pelicula
  });
  nuevaCartelera.save().then(
      function (result) {
        res.json(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );

});

router.post('/buscarCartelera', function (req, res) {

  let _id = req.body.id;

  Cartelera.find({
    _id: _id
  }, (err, cartelera) => {
    if (err) {
      return res.json(cartelera);
    } else {
      return res.json(cartelera);
    }
  })


});
router.post('/buscarCarteleraCine', function (req, res) {

  let _id = req.body.id;

  Cartelera.find({
    idCine: _id
  }, (err, cartelera) => {
    if (err) {
      return res.json(cartelera);
    } else {
      return res.json(cartelera);
    }
  })


});

module.exports = router;