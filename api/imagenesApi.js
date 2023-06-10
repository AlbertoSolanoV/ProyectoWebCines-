var express = require('express');
var router = express.Router();
const multer = require('multer');
//Para subir cines
var storageCine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../ProyectoServer/public/IMG/Cines')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const uploadCine = multer({
  storage: storageCine
});

router.post('/insertarImgCine', uploadCine.single('myFile'), (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    res.status(500).send('ERROR imagen');
  }
  res.status(200).send('Imagen con exito');
});

//Para subir peliculas
var storagePeliculas = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../ProyectoServer/public/IMG/Peliculas')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const uploadPelicula = multer({
  storage: storagePeliculas
});

router.post('/insertarImgPelicula', uploadPelicula.single('myFile'), (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    res.status(500).send('ERROR imagen');
  }
  res.status(200).send('Imagen con exito');
});

module.exports = router;