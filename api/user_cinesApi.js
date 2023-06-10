var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User_cine = require('../schemas/user_cineSchema.js');

router.get('/listar', function (req, res) {
  User_cine.find().exec()
    .then(function (result) {
      res.json(result);
    });
});
router.post('/insertar', function (req, res) {
  var userNuevo = new User_cine({
    _id: new mongoose.Types.ObjectId(),
    idUser: req.body.idUser,
    idCine: req.body.idCine
  });
  userNuevo.save(err => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al registrar jefe de soporte');
    } else {
      res.status(200).send('Registrado con exito');
    }
  });

});


router.post('/buscar', function (req, res) {

  let id = req.body.id;

  User_cine.find({
    idUser: id
  }, (err, User_Cine) => {
    if (err) {
      return res.json(User_Cine);
    } else {
      return res.json(User_Cine);
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