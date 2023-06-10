let params = new URLSearchParams(location.search);
var factura = params.get('idF');
var boletos = params.get('boletos');

var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var idUser = localStorage.getItem("id");
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}


//Para mostrar las tarjetas
var data = {
  id: factura
};

fetch('http://localhost:5000/facturas/buscarFactura', {
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
    var itemFactura = document.getElementById("detalleF");

    var numeroF = "<p class='texto'>Numero de Factura: " + data[0]._id + "</p>";
    itemFactura.insertAdjacentHTML("beforeend", numeroF);
    var cantidadBoletos = " <p class='texto'>Cantidad de Boletos:" + boletos + " </p>";
    itemFactura.insertAdjacentHTML("beforeend", cantidadBoletos);
    var subTot = "<p class='texto'>Subtotal: " + data[0].subTotal + "</p>";
    itemFactura.insertAdjacentHTML("beforeend", subTot);
    var iva = "<p class='texto'>IVA: " + data[0].iva + "</p>";
    itemFactura.insertAdjacentHTML("beforeend", iva);
    var servicio = "<p class='texto'>Servicio: " + data[0].servicio + "</p>";
    itemFactura.insertAdjacentHTML("beforeend", servicio);
    var Total = "<p class='texto'>Total: " + data[0].total + "</p>";
    itemFactura.insertAdjacentHTML("beforeend", Total);

  }).catch(err => console.log('Request Failed', err)); // Catch errors