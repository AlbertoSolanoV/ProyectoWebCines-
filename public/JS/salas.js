var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var cineJefe = localStorage.getItem("CineEncargado");
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente

var cantidadSalas = document.getElementById("cantidadSalas");
var tipoSalas = document.getElementById("tipoSala");
var cantidadButacas = document.getElementById("Cantidadbutacas");
var estadoContent = document.getElementById("modificarEstado");
var idCine = "";
var nombreCine = "";
estadoContent.style.display = "none";
var modificarE = false;
var idSala = "";
var estado = document.getElementById("cbEstado");
//Para mostrar las peliculas nuevas
fetch("http://localhost:5000/cines/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    var itemInfo = document.getElementById("tablaCines");
    for (let i = 0; i < data.length; i++) {
      if (data[i].estado === "1") {
        var infoCine = "<tr onclick='selectCine(this)'><td class='texto' id=" + data[i]._id + "> <img src='../IMG/cines/" + data[i].logo + "'alt='Logo Cine' class='imagen'></td> <td class ='texto'> " + data[i].nombre + " </td> <td class = 'texto' > " + data[i].localizacion + "</td> </tr>";
        itemInfo.insertAdjacentHTML("beforeend", infoCine);
      }
    }
  }
);

function selectCine(td) {
  var filaSeleccionada = td.children;
  idCine = filaSeleccionada[0].id;
  nombreCine = "Agregar salas al cine " + filaSeleccionada[1].innerHTML + " " + filaSeleccionada[2].innerHTML;
  document.getElementById("cineTit").innerHTML = nombreCine;
  cargarSalas(idCine);
}

function cargarSalas(idCine) {
  //Para mostrar las peliculas nuevas
  var data = {
    idCine: idCine
  };

  fetch('http://localhost:5000/salas/buscarSalas', {
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
      var itemInfo = document.getElementById("tablaSalas");
      itemInfo.innerHTML = " <tr><th class='texto'>Tipo</th><th class='texto'>Número</th><th class='texto'>Cantidad de butacas</th><th class='texto'>Estado</th><th class='texto'>Acción</th></tr>";
      for (let i = 0; i < data.length; i++) {
        if (data[i].estado === "1") {
          var salaCine = "<tr><td class='texto' id=" + data[i]._id + "> " + data[i].tipo + "</td> <td class = 'texto' > " + i + "</td> <td class = 'texto' > " + data[i].cantidadButacas + "</td><td class = 'texto' > Activo</td><td class='texto'><i class='fas fa-edit' onclick='modificarSala(this)'></i></td></tr>";
          itemInfo.insertAdjacentHTML("beforeend", salaCine);
        } else {
          var salaCine = "<tr><td class='texto' id=" + data[i]._id + "> " + data[i].tipo + "</td><td class = 'texto' > " + i + "</td> <td class = 'texto' > " + data[i].cantidadButacas + "</td><td class = 'texto' > Desactivado</td><td class='texto'><i class='fas fa-edit' onclick='modificarSala(this)'></i></td></tr>";
          itemInfo.insertAdjacentHTML("beforeend", salaCine);
        }

      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}

function agregar() {
  if (modificarE) {
    if (validarMod(tipoSalas.value)) {
      SendModificar(tipoSalas.value, estado.checked);
      limpiarModi();
      location.reload();
    }
  } else {
    if (validar(cantidadSalas.value, tipoSalas.value, cantidadButacas.value)) {
      nuevaSala(cantidadSalas.value, cantidadButacas.value, tipoSalas.value);
    }
  }


  return false;
}

function validarMod(tipo) {
  var mensaje = "";

  if (tipo === "") {
    mensaje = "Debe seleccionar el tipo de salas \n";
  }
  if (mensaje !== "") {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'ok'
    });
    return false;
  }
  return true;
}

function validar(cantidadSalas, tipo, butacas) {
  var mensaje = "";

  if (cantidadSalas === "") {
    mensaje = mensaje + "Debe seleccionar una cantidad de salas \n";
  }
  if (tipo === "" || tipo === "Tipo de Sala") {
    mensaje = mensaje + "Debe seleccionar un tipo \n";
  }
  if (butacas === "") {
    mensaje = mensaje + "Debe seleccionar una cantidad de butacas \n";
  }
  if (idCine === "") {
    mensaje = mensaje + "Debe seleccionar un cine \n";

  }
  if (mensaje !== "") {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'ok'
    });
    return false;
  }
  return true;
}

function nuevaSala(cantidadSalas, butacas, tipo) {
  var datos = {
    tipo: tipo,
    cantidadButacas: butacas,
    idCine: idCine
  }
  for (let i = 0; i < cantidadSalas; i++) {

    fetch('http://localhost:5000/salas/insertar', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        var idSala = json._id;
        for (let j = 0; j < butacas; j++) {
          var datos = {
            idSala: idSala,
            nombre: j
          }
          fetch('http://localhost:5000/butacas/insertar', {
              method: "post",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(datos)
            })
            .then(function (response) {
              return response.text();
            })
            .then(function (json) {
              //va bien
            })
            .catch(err => console.log('Request Failed', err)); // Catch errors
        }
        Swal.fire({
          title: 'Exito',
          text: "Se creo la sala con exito",
          icon: 'success',
          confirmButtonText: 'ok'
        });
      })
      .catch(err => Swal.fire({
        title: 'Error',
        text: "Sucedio un error",
        icon: 'warning',
        confirmButtonText: 'ok'
      })); // Catch errors
  }
}

function SendModificar(tipo, estado) {
  var estadoV="";
  if (estado) {
    estadoV = "1";
  } else {
    estadoV = "2";
  }
  var datos = {
    id: idSala,
    tipo: tipo,
    estado: estadoV
  }
  fetch('http://localhost:5000/salas/modificar', {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      Swal.fire({
        title: 'Exito',
        text: "Sala actualizada con exito",
        icon: 'success',
        confirmButtonText: 'ok'
      })
    })
    .catch(err => Swal.fire({
      title: 'Error',
      text: "Sucedio un error",
      icon: 'warning',
      confirmButtonText: 'ok'
    })); // Catch errors

}

function modificarSala(td) {
  var filaSeleccionada = td.parentNode.parentNode;
  idSala = filaSeleccionada.cells[0].id;
  modificarE = true;
  document.getElementById("botonAgregar").value = "Modificar";
  estadoContent.style.display = "block";
  tipoSalas.value = filaSeleccionada.cells[0].innerHTML;
  cantidadSalas.disabled = true;

  cantidadButacas.value = parseInt(filaSeleccionada.cells[1].innerHTML);
  cantidadButacas.disabled = true;

  if (filaSeleccionada.cells[2].innerHTML === " Activo") {
    document.getElementById("cbEstado").checked = true;
  } else {
    document.getElementById("cbEstado").checked = false;
  }
}

function limpiarModi() {
  document.getElementById("botonAgregar").value = "Agregar";
  modificarE = false;
  estadoContent.style.display = "none";
  cantidadSalas.disabled = false;
  cantidadButacas.value = 20;
  cantidadButacas.disabled = false;


}