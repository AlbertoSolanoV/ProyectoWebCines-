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
cargarTarjetas();

function cerrarSesion() {
  localStorage.removeItem("Nombre");
  localStorage.removeItem("Correo");
  localStorage.removeItem("id");
  localStorage.removeItem("rango");

}

function guardarTarjeta() {
  var numero = document.getElementById("numeroTarjeta").value;
  var mes = document.getElementById("mesVencimiento").value;
  var anno = document.getElementById("annoVencimiento").value;
  var fechavence = mes + "/" + anno;
  var ccv = document.getElementById("ccvTarjeta").value;
  var nombre = document.getElementById("nombreTarjeta").value;
  var ultimosDig = numero.substr(numero.length - 3);
  //Para mostrar las peliculas nuevas
  var data = {
    _id: idUser,
    NumTrajeta: numero,
    NombreTarjeta: nombre,
    Vence: fechavence,
    ccv: ccv,
    ultDig: ultimosDig
  };
  console.log(data);
  fetch('http://localhost:5000/tarjetas/insertar', {
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
      if (text === "Registrada con exito") {
        Swal.fire({
          title: 'Exitoso',
          text: text,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        limpiar();
        location.reload();
      } else {
        Swal.fire({
          title: 'Ocurrio un error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}

function cargarTarjetas() {
  //Para mostrar las tarjetas
  var data = {
    idCliente: idUser
  };

  fetch('http://localhost:5000/tarjetas/obtener', {
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
          var tarjetas = "<tr > <td class='texto' id=" + data[i]._id + ">" + data[i].NombreTarjeta + "</td> <td class='texto'>" + data[i].ultDig + "</td> <td class='texto'>" + data[i].Vence + "</td><td class='texto'> <button onclick='eliminar(this)'><i class='fas fa-trash-alt'></i></button></td></tr>";
          itemtarjeta.insertAdjacentHTML("beforeend", tarjetas)
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors


}

function limpiar() {
  document.getElementById("numeroTarjeta").value = "";
  document.getElementById("mesVencimiento").value = "";
  document.getElementById("annoVencimiento").value = "";
  document.getElementById("ccvTarjeta").value = "";
  document.getElementById("nombreTarjeta").value = "";
}

function eliminar(td) {
  var filaSeleccionada = td.parentElement.parentElement;
  var idTarjeta = filaSeleccionada.cells[0].id;

  var data = {
    id: idTarjeta
  };

  Swal.fire({
    title: 'Seguro que desea eliminar la tarjeta de su cuenta?',
    text: "No se podra cancelar",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      fetch('http://localhost:5000/tarjetas/eliminar', {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(function (response) {
          return response.text();
        })
        .then(function (text) {
          if (text === "Error al eliminar tarjeta") {
            Swal.fire({
              title: 'Ocurrio un error',
              text: text,
              icon: 'error'
            });
          } else {
            Swal.fire(
              'Eliminado!',
              'Su tarjeta ha sido eliminada.',
              'success'
            )
            location.reload();
          }
        }).catch(err => console.log('Request Failed', err)); // Catch errors
    }
  });
}