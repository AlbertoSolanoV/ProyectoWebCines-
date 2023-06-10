  var nombreCliente = "";
  var idCliente = "";

  function login() {
    var correo = document.getElementById('correoUser').value;
    var contra = document.getElementById('password').value;
    validar(correo, contra);

    return false;
  }

  function recibirInfo(correoUser) {
    //Codigo que llama el api y valida la informacion
    var data = {
      correo: correoUser
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
        if (json.estado === "1") {
          Swal.fire({
            title: 'Correcto',
            text: 'Usuario Correcto',
            icon: 'success',
            confirmButtonText: 'ok'
          });
          localStorage.setItem("Nombre", json.nombre);
          localStorage.setItem("Correo", json.correo);
          localStorage.setItem("id", json._id);
          localStorage.setItem("rango", json.codRol);
          if (json.codRol === "2") { //Jefe de soporte
            jefeSoporte(json._id);
          } else if (json.codRol === "3") { //Admin
            window.location.href = "/HTML/adminUsuarios.html";
          } else if (json.codRol === "1") {
            window.location.href = "../index.html";
          }
        } else {
          Swal.fire({
            title: 'Erro',
            text: 'El usuario no ha sido activado, revisar correo para activarlo',
            icon: 'warning',
            confirmButtonText: 'ok'
          });
        }
      }).catch(err => console.log('Request Failed', err)); // Catch errors
  }


  function validar(correoinfo, contrainfo) {

    //Codigo que llama el api y valida la informacion
    var data = {
      correo: correoinfo,
      contra: contrainfo
    };

    fetch('http://localhost:5000/usuarios/autenticar', {
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
        if (text === "Usuario correcto") {

          recibirInfo(correoinfo);
        } else if (text === "Contrasena incorrecta") {
          Swal.fire({
            title: 'Error',
            text: text,
            icon: 'error',
            confirmButtonText: 'ok'
          });

        } else if (text === "Error el usuario no existe") {
          Swal.fire({
            title: 'Error',
            text: text,
            icon: 'error',
            confirmButtonText: 'ok'
          });

        }
      })
      .catch(err => console.log('Request Failed', err)); // Catch errors
  }
  function jefeSoporte(idUser){
    var data ={
      id: idUser
    }
    fetch('http://localhost:5000/user_cine/buscar', {
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
      localStorage.setItem("CineEncargado", json[0].idCine);
      window.location.href = "/HTML/carteleraAdministrador.html";

    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }