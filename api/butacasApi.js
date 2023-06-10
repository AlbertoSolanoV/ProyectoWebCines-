var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Butaca = require('../schemas/butacasSchema.js');

router.get('/listar', function (req, res) {
  Butaca.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/insertar', function (req, res) {
  var nuevaButaca = new Butaca({
    _id: new mongoose.Types.ObjectId(),
    codSala: req.body.idSala,
    nombre: req.body.nombre
  });
  nuevaButaca.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar butaca');
    } else {
      res.status(200).send('Registrado con exito');
    }
  });

});

router.post('/buscarButacas', function (req, res) {

  let codSala = req.body.sala;

  Butaca.find({
    codSala: codSala
  }, (err, Butacas) => {
    if (err) {
      return res.json(Butacas);
    } else {
      return res.json(Butacas);
    }
  })


});

module.exports = router;