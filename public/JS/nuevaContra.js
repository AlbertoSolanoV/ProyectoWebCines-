let params = new URLSearchParams(location.search);
var idUser = params.get('iduser');
var contra = document.getElementById("contra");

function cambiarContra() {
  if (validarContra(contra.value)) {
    if (cambiar(contra.value)) {
      window.location.href = "../login.html";
    }
  } else {
    Swal.fire({
      title: 'Error',
      text: 'La contraseña debe tener al menos una minuscula, una mayuscula',
      icon: 'warning',
      confirmButtonText: 'ok'
    });
  }
  return false;
}

function validarContra(contraIte) {
  var regularExpression = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/; // Expresion regular para la contraseña
  if (!regularExpression.test(contraIte)) {
    return false;
  }
  return true;
}

function cambiar(contraIn) {
  var data = {
    id: idUser,
    contra: contraIn
  };

  fetch('http://localhost:5000/usuarios/cambiarContra', {
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
      if (text === "Error al cambiar contrasena") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;
      } else if (text === "Contrasena cambiada") {
        Swal.fire({
          title: 'Correcto',
          text: "Contrasena cambiada con exito",
          icon: 'success',
          confirmButtonText: 'ok'
        });
        return true;
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}