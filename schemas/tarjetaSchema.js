var mongoose = require('mongoose');
var bcrypt = require("bcrypt"); //Para incriptar la contrasena

var tarjetaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idCliente: String,
  NumTrajeta: String,
  NombreTarjeta: String,
  Vence: String,
  ccv: String,
  ultDig: String
});


var saltOrRound = 10;

tarjetaSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('NumTrajeta')) {
    const document = this;
    bcrypt.hash(document.NumTrajeta, saltOrRound, (err, hashedPassword) => {
      if (err) {
        next(err);
        console.log(document);
      } else {
        document.NumTrajeta = hashedPassword;
        next();
        console.log(document);
      }
    });
  }
});


module.exports = mongoose.model('Tarjeta', tarjetaSchema, 'Tarjetas');