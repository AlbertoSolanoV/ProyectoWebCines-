//Para que se cambie el nombre del cliente en el inicio
//Accedemos a los valores

/*const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var nombreUser = urlParams.get('user');*/

var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');

//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente
//Para mostrar los cine
fetch("http://localhost:5000/cines/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    var itemCine = document.getElementById("contentCines");
    for (let i = 0; i <= data.length; i++) {
      console.log(data[i].estado)
      if (data[i].estado == "1") {
        var cine = " <div class='menu_cines '><a href='cartelera.html?idcine=" + data[i]._id + "'><img src='../IMG/Cines/" + data[i].logo + "' class='img_cine'>  <div class='info_cine'><p class=' texto-blanco'>" + data[i].nombre + "</p><p class=' texto-blanco'>" + data[i].localizacion + "</p></a></div>";
        itemCine.insertAdjacentHTML("beforeend", cine)
      
      }
    }
  }
);