var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');

//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}

var cedulaInp = document.getElementById("cedula");
var nombreInp = document.getElementById("nombre");
var apellidoInp = document.getElementById("apellido");
var correoInp = document.getElementById("correo");
var fechaInp = document.getElementById("fecha");
var cineInp = document.getElementById("cineInput");

var codUser = "";

//Se ejecuta siempre al inicio
document.getElementById("cineInput").disabled = true;

//Para mostrar los cine
fetch("http://localhost:5000/cines/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    var itemCine = document.getElementById("cines");
    for (let i = 0; i <= data.length; i++) {
      console.log(data[i].estado)
      if (data[i].estado == "1") {
        var cine = "<option class='texto' value=" + data[i].nombre + " data-id=" + data[i]._id + " name=" + data[i].nombre + "> " + data[i].localizacion + " </option>";

        itemCine.insertAdjacentHTML("beforeend", cine)

      }
    }
  }
);

function jefesSoporte() {
  document.getElementById("cineInput").disabled = false;
  codUser = "2";
}

function clienteNormal() {
  document.getElementById("cineInput").disabled = true;
  codUser = "1";
}

function registrar() {
  if (validar(fechaInp.value, nombreInp.value, apellidoInp.value)) {
    agregarUser(cedulaInp.value, nombreInp.value, apellidoInp.value, correoInp.value, edad(fechaInp.value));
  } else {

  }

  return false;
}

function validar(fecha, nombre, apellido) {
  var mensaje = "";

  if (edad(fecha) <= 18) {
    mensaje = "Tiene que ser mayor de edad para registrarse \n";
  }

  if (nombre === "") {
    mensaje = mensaje + "El nombre no puede estar vacio\n";
  }
  if (apellido === "") {
    mensaje = mensaje + "El apellido no puede estar vacio\n";
  }
  if (codUser === "2") {
    if (cineInp.value === "") {
      mensaje = mensaje + "Debe seleccionar un cine\n";
    }
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

const generateRandomString = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result1;
}

function agregarUser(cedula, nombre, apellido, correo, edad) {
  var contraGenerada = generateRandomString(8);
  //Codigo que llama el api y valida la informacion
  console.log(contraGenerada);
  var data = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    edad: edad,
    contra: contraGenerada,
    codRol: codUser,
    estado: "1"
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
        enviarCorreo(correo, contraGenerada);

        if (codUser === "2") {
          var cine = document.getElementById("cines");
          var selectedOption = cine.options.namedItem(cineInp.value);
          var selectedId = selectedOption.getAttribute('data-id');

          var datos = {
            correo: correo
          }
          fetch('http://localhost:5000/usuarios/listarUno', {
              method: "post",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(datos)
            })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {

              var datos = {
                idUser: json._id,
                idCine: selectedId
              }
              fetch('http://localhost:5000/user_cine/insertar', {
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
                  if (text === "Error al registrar jefe de soporte") {
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
      }
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors

}

function enviarCorreo(correo, contra) {
  var data = {
    correo: correo,
    contra: contra
  };

  fetch('http://localhost:5000/usuarios/enviarCorreoAdmin', {
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
}