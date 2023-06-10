var mongoose = require('mongoose');
var bcrypt = require("bcrypt"); //Para incriptar la contrasena

var usuarioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cedula: Number,
  nombre: String,
  apellido: String,
  correo: String,
  edad: Number,
  codRol: String,
  contra: String,
  estado: String
});
var saltOrRound = 10;

usuarioSchema.pre('save', function (next) {
  console.log("entro a pre save");
  if (this.isNew || this.isModified('contra')) {
    const document = this;
    bcrypt.hash(document.contra, saltOrRound, (err, hashedPassword) => {
      if (err) {
        next(err);
        console.log(document);
      } else {
        document.contra = hashedPassword;
        next();
        console.log(document);
      }
    });
  }
});

usuarioSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.contra, function (err, same) {
    if (err) {
      console.log(err); //No es correcto
    } else {
      callback(err, same); //Es correcto
    }
  });
}
module.exports = mongoose.model('Usuario', usuarioSchema, 'Usuarios');