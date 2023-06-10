let params = new URLSearchParams(location.search);
var idUser = params.get('iduser');
var cod = document.getElementById('clave');

function activacion() {
  if (validarCod(cod.value)) {
    window.location.href = "../login.html";
  }
  return false;
}


function validarCod(codigo) {
  var data = {
    _id: idUser,
    codigo: codigo
  };

  fetch('http://localhost:5000/usuarios/actualizarEstado', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text === "Error al activar usuario") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;
      } else if (text === "Error al activar usuario, codigo incorrecto") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;
      } else if (text === "Usuario activado") {
        Swal.fire({
          title: 'Correcto',
          text: text + ", puede iniciar sesión",
          icon: 'success',
          confirmButtonText: 'ok'
        });
        return true;
      } else if (text === "Error el usuario no existe") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}