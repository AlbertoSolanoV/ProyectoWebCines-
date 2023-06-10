var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require("bcrypt"); //Para incriptar la contrasena
const nodemailer = require("nodemailer");

var Usuario = require('../schemas/usuarioSchema.js');


router.get('/listar', function (req, res) {
  Usuario.find().exec()
    .then(function (result) {
      res.json(result);
    });
});

router.get('/listarJefes', function (req, res) {
  Usuario.find({
      estado: "2"
    }).exec()
    .then(function (result) {
      res.json(result);
    });
});

router.post('/listarUno', function (req, res) {
  const {
    correo
  } = req.body;
  Usuario.findOne({
    correo
  }, (err, usuario) => {
    if (err) {
      res.status(500).send('Error al autenticar usuario');
    } else if (!usuario) {
      res.status(500).send('Error el usuario no existe');
    } else {
      res.json(usuario);

    }
  });
});

router.post('/insertar', function (req, res) {
  var usuarioNuevo = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    edad: req.body.edad,
    codRol: req.body.codRol,
    contra: req.body.contra,
    estado: req.body.estado //Para que siempre que se cree un nuevo usuario este desabilitado
  });
  let yaExiste = false;
  Usuario.find().exec()
    .then(function (result) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].correo === req.body.correo) {
          yaExiste = true;
        }
      }
      if (yaExiste) {
        res.status(500).send('El correo ya esta registrado en otra cuenta');
      } else {
        usuarioNuevo.save(err => {
          if (err) {
            console.log(err);
            res.status(500).send('Error al registrar usuario');
          } else {
            res.status(200).send('Registrado con exito');
          }
        });
      }
    });
});

router.post('/autenticar', function (req, res) {
  const {
    correo,
    contra
  } = req.body;
  Usuario.findOne({
    correo
  }, (err, usuario) => {
    if (err) {
      res.status(500).send('Error al autenticar usuario');
    } else if (!usuario) {
      res.status(500).send('Error el usuario no existe');
    } else {
      usuario.isCorrectPassword(contra, (err, result) => {
        if (err) {
          res.status(500).send('Error al autenticar usuario');
        } else if (result) {
          res.status(200).send('Usuario correcto');
        } else if (!result) {
          res.status(500).send('Contrasena incorrecta');
        }
      })
    }
  });
});

router.put('/actualizarEstado', function (req, res) {

  const {
    _id,
    codigo
  } = req.body;
  Usuario.findOne({
    _id
  }, (err, usuario) => {
    if (err) {
      res.status(500).send('Error al autenticar usuario');
    } else if (!usuario) {
      res.status(500).send('Error el usuario no existe');
    } else {
      console.log(usuario);
      if (usuario.estado === codigo) {
        var datos = {
          _id: _id
        };
        var actualizar = {
          estado: 1
        };
        Usuario.findOneAndUpdate(datos, actualizar, function (err) {
          if (err) {
            res.status(500).send('Error al activar usuario');

          } else {
            res.status(200).send('Usuario activado');
          }
        });
      } else {
        res.status(500).send('Error al activar usuario, codigo incorrecto');

      }


    }
  });

});

router.put('/cambiarCorreo', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  var actualizar = {
    correo: req.body.correo
  };
  let yaExiste = false;

  Usuario.find().exec()
    .then(function (result) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].correo === req.body.correo) {
          yaExiste = true;
        }
      }
      if (yaExiste) {
        res.status(500).send('El correo ya esta registrado en otra cuenta');
      } else {
        Usuario.findOneAndUpdate(datos, actualizar, function (err) {
          if (err) {
            res.status(500).send('Error al activar correo');
          } else {
            res.status(200).send('Correo del usuario cambiado con exito');
          }
        });
      }
    });

});

router.put('/cambiarContra', function (req, res) {
  var datos = {
    _id: req.body.id,
  };
  const {
    contra
  } = req.body;
  var contraEncrip;
  var saltOrRound = 10;
  bcrypt.hash(contra, saltOrRound, (err, hashedPassword) => {
    if (err) {
      res.status(500).send('Error al cambiar contrasena');
    } else {
      contraEncrip = hashedPassword;
      var actualizar = {
        contra: contraEncrip
      };
      Usuario.findOneAndUpdate(datos, actualizar, function (err) {
        if (err) {
          res.status(500).send('Error al cambiar contrasena');
        } else {
          res.status(200).send('Contrasena cambiada');
        }
      });
    }
  });


});

router.post('/enviarCorreo', function (req, res) {

  var _id = req.body._id;
  var correo = req.body.correo;


  // create reusable transporter object using the default SMTP transport
  console.log(_id);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "albertosolanovillalta@gmail.com", // generated ethereal user
      pass: "odcz apah eoto mryl", // generated ethereal password
    },
  });
  try {
    // send mail with defined transport object
    console.log(_id);
    var data = {
      from: ' Recuperar Contrasena <foo@example.com>', // sender address
      to: correo, // list of receivers
      subject: "Recuperar Contrasena", // Subject line
      html: "<h1>Cambiar contraseña</h1> <p> Para cambiar la contraseña ingrese al siguiente link: <a href='http://localhost:5000/HTML/indexNuevaC.html?iduser=" + _id + "'>Link</a></p>", // html body
    };
    let info = transporter.sendMail(data);

    res.status(200).send('Enviado con exito');

  } catch (error) {
    res.status(500).send('Error al enviar correo');

  }


});

router.post('/enviarCorreoAc', function (req, res) {

  var _id = req.body._id;
  var correo = req.body.correo;
  var cod = req.body.codigo;


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "albertosolanovillalta@gmail.com", // generated ethereal user
      pass: "odcz apah eoto mryl", // generated ethereal password
    },
  });
  try {
    // send mail with defined transport object
    var data = {
      from: ' Activar cuenta TOURMLINE <foo@example.com>', // sender address
      to: correo, // list of receivers
      subject: "Activar Cuenta", // Subject line
      html: "<h1>Activar Cuenta</h1><p>Número de activación = " + cod + "</p> <p> Para activar la cuenta ingrese al siguiente link: <a href='http://localhost:5000/HTML/indexActivarUser.html?iduser=" + _id + "'>Link</a></p>", // html body
    };
    let info = transporter.sendMail(data);
    res.status(200).send('Enviado con exito');
  } catch (error) {
    res.status(500).send('Error al enviar correo');
  }
});

router.post('/enviarCorreoAdmin', function (req, res) {

  var correo = req.body.correo;
  var contra = req.body.contra;


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "albertosolanovillalta@gmail.com", // generated ethereal user
      pass: "odcz apah eoto mryl", // generated ethereal password
    },
  });
  try {
    // send mail with defined transport object
    var data = {
      from: ' Cuenta creada por administrador <foo@example.com>', // sender address
      to: correo, // list of receivers
      subject: "Su cuenta fue creada por administrador", // Subject line
      html: "<h1>Su contraseña</h1><p>Su contraseña es: "+contra+" , al inicio tiene un espacio, puede cambiarla desde su perfil.</p>", // html body
    };
    let info = transporter.sendMail(data);
    res.status(200).send('Enviado con exito');
  } catch (error) {
    res.status(500).send('Error al enviar correo');
  }
});

module.exports = router;