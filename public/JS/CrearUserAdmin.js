//Se ejecuta siempre al inicio
document.getElementById("cineSelect").disabled = true;

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
        var cine = "<option class='texto' value=" + data[i].nombre + ">" + data[i].localizacion + "</option>";

        itemCine.insertAdjacentHTML("beforeend", cine)

      }
    }
  }
);
var codUser = "";

function capturarDatos() {
  /*
  Orden de las funciones
  1 - Definir e inicializar varible
   */
  var usuario1 = document.getElementById("susuario1").value;
  var nombreuser = document.getElementById("snombre1").value;
  var apellidouser = document.getElementById("sapellido1").value;
  var direccion = document.getElementById("sdireccion").value;
  var edadC = document.getElementById("sedadC").value;
  var contrasenia1 = document.getElementById("scontrasenia1").value;
  var contraseniaC1 = document.getElementById("scontraseniaC1").value;

  //Transformar edad (calcular)
  var edadUser = 20;

  if (validarDatos(usuario1, direccion, edadC, contrasenia1, contraseniaC1) || validarCorreoNuevo(direccion)) {

    var data = {
      cedula: parseInt(usuario1, 10),
      nombre: nombreuser,
      apellido: apellidouser,
      correo: direccion,
      edad: edadUser,
      codRol: codUser,
      contra: contrasenia1,
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
      .then(function (json) {
        console.log(text);
        if (json === "Registrado con exito") {
          Swal.fire({
            title: 'Correcto',
            text: 'Usuario guardado',
            icon: 'success',
            confirmButtonText: 'ok'
          });
        }
      })
      .catch(err => console.log('Request Failed', err)); // Catch errors
  }
  return false;
}

function jefesSoporte() {
  document.getElementById("cineSelect").disabled = false;
  codUser = 2;
}

function clienteNormal() {
  document.getElementById("cineSelect").disabled = true;
  codUser = 1;
}

function validarCorreoNuevo(correo) {
  fetch("http://localhost:5000/cines/listar").then(
    function (response) {
      return response.json();
    }).then(
    function (data) {
      for (let i = 0; i <= data.length; i++) {
        if (data[i].correo === correo) {
          return false;
        } else {
          return true;
        }
      }
    }
  );
}


function validarDatos(usuario1, direccion, edadC, contrasenia1, contraseniaC1) { //Falta validar datos

  if (usuario1 == '') {
    Swal.fire({
      title: 'Error',
      text: 'El numero de identificacion esta en blanco',
      icon: 'error',
      confirmButtonText: 'ok'
    });
    return false;
  } else if (direccion == '') {
    Swal.fire({
      title: 'Error',
      text: 'El correo electronico está en blanco',
      icon: 'error',
      confirmButtonText: 'ok'
    });
    return false;
  } else if (edadC == '') {
    Swal.fire({
      title: 'Error',
      text: 'La fecha de nacimiento está en blanco',
      icon: 'error',
      confirmButtonText: 'ok'
    });
    return false;
  } else if (contrasenia1 == '') {
    Swal.fire({
      title: 'Error',
      text: 'La contraseña esta en blanco o no es valida',
      icon: 'error',
      confirmButtonText: 'ok'
    });
    return false;
  } else if (contraseniaC1 == '' || contraseniaC1 === contrasenia1) {
    Swal.fire({
      title: 'Error',
      text: 'La confirmacion de contraseña está en blanco o no coinciden',
      icon: 'error',
      confirmButtonText: 'ok'
    });

    return false;
  }
  return true;


}