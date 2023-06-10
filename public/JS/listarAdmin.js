//Accedemos a los valores
var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var idCliente = localStorage.getItem("id");
var cineJefe = localStorage.getItem("CineEncargado");
var idRango = localStorage.getItem("rango");
var cineJefe = "";
var peliculas = [];
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
cargarUsuarios();
cargarPeliculas();
cargarCartelera();


function cargarUsuarios() {
  //Para mostrar las tarjetas
  fetch("http://localhost:5000/usuarios/listar").then(
    function (response) {
      return response.json();
    }).then(
    function (data) {
      var itemUser = document.getElementById("tableBodyUsuarios");
      for (let i = 0; i <= data.length; i++) {
        if (data[i].codRol === "1") {
          var usuarios = "<tr > <td class='texto'>" + data[i].nombre + " " + data[i].apellido + "</td><td class='texto'> " + data[i].correo + "</td> <td class='texto'>" + data[i].edad + "</td> </tr>";
          itemUser.insertAdjacentHTML("beforeend", usuarios)
        }
      }
    }
  );
}

function cargarPeliculas() {
  //Para mostrar las tarjetas
  fetch("http://localhost:5000/peliculas/listar").then(
    function (response) {
      return response.json();
    }).then(
    function (data) {
      var itemPelic = document.getElementById("tableBodyPeliculas");
      for (let i = 0; i <= data.length; i++) {

        var pelicula = "<tr > <td class='texto'>" + data[i].nombre + "</td><td class='texto'> " + data[i].categoria + "</td> <td class='texto'>" + data[i].clasificacion + "</td><td class='texto'>" + data[i].duracion + "</td>  </tr>";
        itemPelic.insertAdjacentHTML("beforeend", pelicula)

      }
      peliculas = data;
    }
  );
}

function cargarCartelera() {
  //Para mostrar las tarjetas
  fetch("http://localhost:5000/carteleras/listar").then(
    function (response) {
      return response.json();
    }).then(
    function (data) {
      var itemUser = document.getElementById("tableBodyCartelera");

      for (let i = 0; i <= data.length; i++) {
        var usuarios = "<tr > <td class='texto'>" + data[i]._id + "</td><td class='texto'> " + data[i].idPelicula + "</td> <td class='texto'>" + data[i].horario + "</td><td class='texto'>" + data[i].fechaIni + "</td><td class='texto'>" + data[i].fechaFin + "</td> </tr>";
        itemUser.insertAdjacentHTML("beforeend", usuarios)


      }
    }
  );
}