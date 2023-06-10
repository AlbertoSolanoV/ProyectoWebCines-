var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');

//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='HTML/perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente

//Para mostrar las peliculas nuevas
fetch("http://localhost:5000/peliculas/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    var itemPeli = document.getElementById("peliEstrenos");
    for (let i = 0; i < data.length; i++) {
      var pelicula = " <a href='HTML/cartelera.html'><div class=' menu_pelicula'><img src='IMG/Peliculas/" + data[i].img + "' class='img_pelicula'><p class='nombre_pelicula'>" + data[i].nombre + "</p></div></a>"
      itemPeli.insertAdjacentHTML("beforeend", pelicula)
    }
  }
);
//Para mostrar los cines nuevos
fetch("http://localhost:5000/cines/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    var itemCine = document.getElementById("carrouselCines");
    var cine = " <div class='carousel-item active'> <img src='IMG/Cines/" + data[0].logo + "' class='d-block w-100 img_carousel' alt='...''></div>"
    itemCine.insertAdjacentHTML("beforeend", cine)
    for (let i = 1; i < data.length; i++) {
      cine = " <div class='carousel-item'> <img src='IMG/Cines/" + data[i].logo + "' class='d-block w-100 img_carousel' alt='...''></div>"
      itemCine.insertAdjacentHTML("beforeend", cine)
    }
  }
);