//Para que se cambie el nombre del cliente en el inicio
//Accedemos a los valores
var nombreUser = localStorage.getItem("Nombre");
var idUser = localStorage.getItem("id");
var nombre = document.getElementById('userid');
var correoUser = localStorage.getItem("Correo");
var inputCorreo = document.getElementById("correocontent");

//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='/HTML/perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
  inputCorreo.value = correoUser;
}

function EnviarCorreo() {
  if (nombreUser != null) {
    var data = {
      _id: idUser,
      correo: inputCorreo.value
    };

    fetch('http://localhost:5000/usuarios/enviarCorreo', {
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
        if (text === "Enviado con exito") {
          Swal.fire({
            title: 'Correcto',
            text: 'Enviado con exito',
            icon: 'success',
            confirmButtonText: 'ok'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ha sucedido un error, intentelo de nuevo',
            icon: 'error',
            confirmButtonText: 'ok'
          });
        }
      }).catch(err => console.log('Request Failed', err)); // Catch errors
  } else {
    var data = {
      correo: inputCorreo.value
    };

    fetch('http://localhost:5000/usuarios/listarUno', {
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
        if (text === "Error el usuario no existe") {
          Swal.fire({
            title: 'Error',
            text: 'El usuario no existe',
            icon: 'error',
            confirmButtonText: 'ok'
          });
        } else {
        var jsondata =  JSON.parse(text);
          var data = {
            _id: jsondata._id,
            correo: inputCorreo.value
          };

          fetch('http://localhost:5000/usuarios/enviarCorreo', {
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
              if (text === "Enviado con exito") {
                Swal.fire({
                  title: 'Correcto',
                  text: 'Enviado con exito',
                  icon: 'success',
                  confirmButtonText: 'ok'
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'Ha sucedido un error, intentelo de nuevo',
                  icon: 'error',
                  confirmButtonText: 'ok'
                });
              }
            }).catch(err => console.log('Request Failed', err)); // Catch errors
        }

      }).catch(err => console.log('Request Failed', err)); // Catch errors
  }




  return false;
}