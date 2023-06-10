var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Pelicula = require('../schemas/peliculaSchema.js');

router.get('/listar', function (req, res) {
  Pelicula.find().exec()
    .then(function (result) {
      res.json(result);
    });
});
router.post('/insertar', function (req, res) {
  var peliculaNueva = new Pelicula({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    clasificacion: req.body.clasificacion,
    duracion: req.body.duracion,
    img: req.body.imagen,
    sinopsis: req.body.sinopsis,
  });
  peliculaNueva.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar pelicula');
    } else {
      res.status(200).send('Registrado con exito');
    }
  });

});


router.post('/buscarPelicula', function (req, res) {

  let nombre = req.query.nombre;

  Pelicula.findOne({
    nombre: nombre
  }, (err, peliculaDB) => {
    if (err) {
      return res.json({
        success: false,
        msj: 'No se encontro ningun nombre igual',
        err
      });
    } else {
      return res.json({
        success: true,
        pelicula: peliculaDB
      });
    }
  })


});

router.put('/modificar', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    clasificacion: req.body.clasificacion,
    duracion: req.body.duracion,
    img: req.body.imagen,
    sinopsis: req.body.sinopsis,
  };
  Pelicula.findOneAndUpdate(datos, actualizar, function (err) {
    if (err) {
      res.status(500).send('Error al actualizar pelicula');

    } else {
      res.status(200).send('Pelicula actualizada con exito');
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