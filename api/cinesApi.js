var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var Cine = require('../schemas/cineSchema.js');

router.get('/listar', function (req, res) {
  Cine.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/insertar', function (req, res) {
  var cineNuevo = new Cine({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    localizacion: req.body.localizacion,
    logo: req.body.logo,
    estado: "1"
  });
  cineNuevo.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar cine');
    } else {
      res.status(200).send('Registrado con exito');
    }
  });
});

router.put('/modificarInfo', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    nombre: req.body.Nombre,
    localizacion: req.body.Localizacion,
    logo: req.body.Logo,
    estado : "1"
  };
  Cine.findOneAndUpdate(datos, actualizar, function (err) {
    if (err) {
      res.status(500).send('Error al actualizar cine');

    } else {
      res.status(200).send('Cine Actualizado');
    }
  });
});
router.put('/cambiarEstado', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    estado : "0"
  };
  Cine.findOneAndUpdate(datos, actualizar, function (err) {
    if (err) {
      res.status(500).send('Error al desabilitar cine');

    } else {
      res.status(200).send('Cine desabilitado');
    }
  });
});

router.post('/buscarCine', function (req, res) {

  let _id = req.body.id;

  Cine.find({
    _id: _id
  }, (err, Cine) => {
    if (err) {
      return res.json(Cine);
    } else {
      return res.json(Cine);
    }
  })


});

module.exports = router;