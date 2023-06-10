var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var id = localStorage.getItem('id');
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente
cargarBoletos();

function cargarBoletos() {
  //Para mostrar las tarjetas
  var data = {
    id: id
  };

  fetch('http://localhost:5000/boletos/buscarboletos', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var itemtarjeta = document.getElementById("tableBody");
      for (let i = 0; i <= data.length; i++) {
        var tarjetas = "<tr > <td class='texto'>" + data[i]._id + "</td> <td class='texto'>" + data[i].idCartelera + "</td> <td class='texto'>" + data[i].idButaca + "</td></tr>";
        itemtarjeta.insertAdjacentHTML("beforeend", tarjetas)
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors


}