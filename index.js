var express = require("express"); //Incluyo el express
var app = express(); //inicializo express
var path = require("path"); //incluyo path
var bcrypt = require("bcrypt"); //Para incriptar la contrasena
var mongoose = require('mongoose'); // Para el uso de la base de datos
mongoose.connect('mongodb+srv://admin:admin@cluster0.bsvuq.mongodb.net/ProyectoDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//url
app.use(express.json());

var folder = path.join(__dirname, "public") //Carpeta en donde van a estar los archivos
app.use('/peliculas', require('./api/peliculasApi.js')); //Para utilizar el API de peliculas
app.use('/carteleras', require('./api/cartelerasApi.js')); //Para utilizar el API de cartelera
app.use('/cines', require('./api/cinesApi.js')); //Para utilizar el API de cine
app.use('/usuarios', require('./api/usuariosApi.js')); //Para utilizar el API de cine
app.use('/margenes', require('./api/margenApi.js')); //Para utilizar el API de margen
app.use('/tarjetas', require('./api/tarjetasApi.js')); //Para utilizar el API de tarjetas
app.use('/user_cine', require('./api/user_cinesApi.js')); //Para utilizar el API de user_cine
app.use('/butacas', require('./api/butacasApi.js')); //Para utilizar el API de user_cine
app.use('/butacas_cartelera', require('./api/butacas_carteleraApi.js')); //Para utilizar el API de butacas-cartelera
app.use('/salas', require('./api/salasApi.js')); //Para utilizar el API de user_cine
app.use('/facturas', require('./api/facturaApi.js')); //Para utilizar el API de user_cine
app.use('/boletos', require('./api/boletosApi.js')); //Para utilizar el API de user_cine
app.use('/imagenes', require('./api/imagenesApi.js')); //Para utilizar el API de user_cine


app.use(express.static(folder)); //Le indico a express que use la carpeta
app.listen(5000, function () {
    console.log("Servidor Encendido");
}); //levante en puerto 5000