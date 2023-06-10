//Accedemos a los valores
var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var idCliente = localStorage.getItem("id");
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}

cargarUsuarios();
function cargarUsuarios() {
  //Para mostrar las tarjetas
  fetch("http://localhost:5000/usuarios/listar").then(
    function (response) {
      return response.json();
    }).then(
    function (data) {
      var itemUser = document.getElementById("tableBodyUsuarios");
      for (let i = 0; i <= data.length; i++) {
        if (data[i].codRol === "2") {
          var usuarios = "<tr > <td class='texto'>" + data[i].nombre + " " + data[i].apellido + "</td><td class='texto'> "+ data[i].correo + "</td> <td class='texto'>" + data[i].edad + "</td> </tr>";
          itemUser.insertAdjacentHTML("beforeend", usuarios)
        }
      }
    }
  );
}