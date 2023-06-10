var cedulaInp = document.getElementById("cedula");
var nombreInp = document.getElementById("nombre");
var apellidoInp = document.getElementById("apellidos");
var correoInp = document.getElementById("correo");
var fechaInp = document.getElementById("fecha");
var contraPriInp = document.getElementById("contraPri");
var contraSegInp = document.getElementById("contraSeg");

function registrar() {
  if (validar(fechaInp.value, contraPriInp.value, contraSegInp.value, nombreInp.value, apellidoInp.value)) {
    agregarUser(cedulaInp.value, nombreInp.value, apellidoInp.value, correoInp.value, edad(fechaInp.value), contraPriInp.value);
  } else {

  }

  return false;
}

function validar(fecha, contraPri, contraSeg, nombre, apellido) {
  var mensaje = "";

  if (edad(fecha) <= 18) {
    mensaje = "Tiene que ser mayor de edad para registrarse \n";
  }
  var regularExpression = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/; // Expresion regular para la contraseña
  if (!regularExpression.test(contraPri)) {
    mensaje = mensaje + "La contraseña debe tener minimo 8 caracteres y ser alfanumerica con Mayusculas y minusculas \n";
  }
  if (contraPri !== contraSeg) {
    mensaje = mensaje + "La contraseñas deben coincidir \n";
  }
  if (nombre === "") {
    mensaje = mensaje + "El nombre no puede estar vacio\n";
  }
  if (apellido === "") {
    mensaje = mensaje + "El apellido no puede estar vacio\n";
  }
  if (mensaje !== "") {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'ok'
    });
    return false;
  }
  return true;
}

function edad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function agregarUser(cedula, nombre, apellido, correo, edad, contra) {

  //Codigo que llama el api y valida la informacion
  var numeroRandom = getRandomArbitrary(1000, 9999);
  var data = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    edad: edad,
    contra: contra,
    codRol: "1",
    estado: numeroRandom
  };
  console.log(data);
  fetch('http://localhost:5000/usuarios/insertar', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text === "Error al registrar usuario") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
      } else if (text === "El correo ya esta registrado en otra cuenta") {
        Swal.fire({
          title: 'Error',
          text: text + "Si es su cuenta, puede recuperar su contraseña o activar la cuenta",
          icon: 'error',
          confirmButtonText: 'ok'
        });
      } else if (text === "Registrado con exito") {
        Swal.fire({
          title: 'Exito',
          text: "Revise su correo para activar su cuenta",
          icon: 'success',
          confirmButtonText: 'ok'
        });
        enviarCorreoActiva(correo, numeroRandom);
      }
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function enviarCorreoActiva(correo, numeroRan) {
  var data = {
    correo: correo
  };
  fetch('http://localhost:5000/usuarios/listarUno', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {

      var datos = {
        _id: json._id,
        correo: correo,
        codigo:numeroRan
      }
      fetch('http://localhost:5000/usuarios/enviarCorreoAc', {
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datos)
        })
        .then(function (response) {
          return response.text();
        })
        .then(function (text) {
          if (text === "Error al enviar correo") {
            Swal.fire({
              title: 'ERROR',
              text: "ERROR AL ENVIAR CORREO",
              icon: 'error',
              confirmButtonText: 'ok'
            });
          }
        })
        .catch(err => console.log('Request Failed', err)); // Catch errors

    })
    .catch(err => console.log('Request Failed', err)); // Catch errors

}