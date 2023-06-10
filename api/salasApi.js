var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Sala = require('../schemas/salasSchema');

router.get('/listar', function (req, res) {
  Sala.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/insertar', function (req, res) {
  var nuevaSala = new Sala({
    _id: new mongoose.Types.ObjectId(),
    tipo: req.body.tipo,
    cantidadButacas: req.body.cantidadButacas,
    idCine: req.body.idCine,
    estado: "1" //para que siempre este activo
  });
  nuevaSala.save().then(
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


router.post('/buscarSalas', function (req, res) {

  let idCine = req.body.idCine;

  Sala.find({
    idCine: idCine
  }, (err, Salas) => {
    if (err) {
      return res.json(Salas);
    } else {
      return res.json(Salas);
    }
  })


});

router.put('/modificar', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    tipo: req.body.tipo,
    estado: req.body.estado
  };
  Sala.findOneAndUpdate(datos, actualizar, function (err) {
    if (err) {
      res.status(500).send('Error al actualizar sala');

    } else {
      res.status(200).send('Sala actualizada con exito');
    }
  });
});


router.delete('/eliminar', function (req, res) {

  var id = req.body.id;
  Pelicula.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      res.status(500).send('Error al eliminar Pelicula');
    } else {
      res.status(200).send('Eliminada con exito');
    }
  });
});


module.exports = router;