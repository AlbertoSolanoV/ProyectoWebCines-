//Para que se cambie el nombre del cliente en el inicio
//Accedemos a los valores
var nombreUser = localStorage.getItem("Nombre");
var idUser = localStorage.getItem("id");
var nombre = document.getElementById('userid');
var correoUser = localStorage.getItem("Correo");
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='HTML/perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente
mostrarInformacion();

function mostrarInformacion() {
  //Para mostrar las peliculas nuevas
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
      var itemInfo = document.getElementById("contentInfo");

      var infoNombre = "<div class='contenido_user_info flex'><p class='texto'>Nombre:  </p><p class='texto'>" + json.nombre + "</p></div>";
      itemInfo.insertAdjacentHTML("beforeend", infoNombre);

      var infoApellido = " <div class='contenido_user_info flex'><p class='texto'>Apellidos:  </p><p class='texto'>" + json.apellido + "</p></div>";
      itemInfo.insertAdjacentHTML("beforeend", infoApellido);

      var infoEdad = " <div class='contenido_user_info flex'><p class='texto'>Edad:  </p><p class='texto'>" + json.edad + "</p></div>";
      itemInfo.insertAdjacentHTML("beforeend", infoEdad);

      var infoCorreo = "<div class = 'contenido_user_info flex'><p class ='texto' > Correo:  </p> <input class = 'correo_input' type = 'email' name = 'correo_user' id = 'Correo_User' value = " + json.correo + " ><button class = 'boton' onclick='modificarCorreo()'> Modificar Correo </button> </div > ";
      itemInfo.insertAdjacentHTML("beforeend", infoCorreo);

      var infoContra = "<div class = 'contenido_user_info flex'><p class = 'texto'> Contraseña: </p> <a href='indexRecuperarC.html'> <button class = 'boton' > Modificar Contraseña </button></a></div></p>"

      itemInfo.insertAdjacentHTML("beforeend", infoContra)
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}

function modificarCorreo(){
var contentCorreo= document.getElementById("Correo_User").value;

var data = {
  id : idUser,
  correo: contentCorreo
};

fetch('http://localhost:5000/usuarios/cambiarCorreo', {
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
    if (text === "El correo ya esta registrado en otra cuenta") {
      Swal.fire({
        title: 'Ya existe',
        text: text,
        icon: 'error',
        confirmButtonText: 'ok'
      });
    }else if(text === "Error al activar correo"){
      Swal.fire({
        title: 'ERROR',
        text: text,
        icon: 'error',
        confirmButtonText: 'ok'
      });
    }else if(text === "Correo del usuario cambiado con exito"){
      Swal.fire({
        title: 'Correcto',
        text: text,
        icon: 'success',
        confirmButtonText: 'ok'
      });
      localStorage.removeItem("Correo");
      localStorage.setItem("Correo", contentCorreo);
    }
  }).catch(err => console.log('Request Failed', err)); // Catch errors
}


function cerrarSesion() {
  localStorage.removeItem("Nombre");
  localStorage.removeItem("Correo");
  localStorage.removeItem("id");
  localStorage.removeItem("rango");

}