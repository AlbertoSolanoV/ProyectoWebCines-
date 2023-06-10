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

function pagar(){
  Swal.fire({
    title: 'Exitoso',
    text: 'Pago exitoso',
    icon: 'success',
    confirmButtonText: 'ok'
  });
  window.location.href = "/HTML/viscompratickete.html?idF="+factura+"&boletos="+boletos;
  return false;
}