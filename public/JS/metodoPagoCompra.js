let params = new URLSearchParams(location.search);
var cartelera = params.get('id');
var facturaId = params.get('idF');
var totalP = params.get('total');
var boletos = params.get('boletos');

var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var idUser = localStorage.getItem("id");
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}

var cantSelec = 0;
var butacaSelec = [];
//Para cargar los datos
var datosPelicula;
var datosCartelera;
var datosCine;
var datosGeneral = [{
  "idCartelera": "",
  "img": "",
  "pelicula": "",
  "nombre": "",
  "clasificacion": "",
  "tipo": "",
  "duracion": "",
  "sinopsis": "",
  "cine": "",
  "estado": "",
  "fechaIni": "",
  "fechaFin": "",
  "sala": ""
}];
var datosHorarios = [{
  "idCartelera": "",
  "horario": "",
  "pelicula": "",
  "tipo": ""
}];
//Para recibir la informacion
fetch("http://localhost:5000/peliculas/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    datosPelicula = data;
    //Para mostrar las cines
    fetch("http://localhost:5000/cines/listar").then(
      function (response) {
        return response.json();
      }).then(
      function (data) {
        datosCine = data;
        //Para mostrar las carteleras
        fetch("http://localhost:5000/carteleras/listar").then(
          function (response) {
            return response.json();
          }).then(
          function (data) {
            datosCartelera = data;
            llenarArrayTodo(datosPelicula, datosCartelera, datosCine);
            llenarInfo();
          }
        );
      }
    );
  }
);

function validarPelicula(idPelicula, tipo) {
  for (let peli = 1; peli < datosGeneral.length; peli++) {
    if (datosGeneral[peli].pelicula === idPelicula && datosGeneral[peli].tipo === tipo) {
      console.log("Exite en");
      return true;
    }
  }
  return false;
}

function llenarArrayTodo(infoPelicula, infoCartelera, infoCine) {
  console.log(infoPelicula);
  for (let i = 0; i < infoCartelera.length; i++) {
    for (let j = 0; j < infoPelicula.length; j++) {
      if (infoPelicula[j]._id === infoCartelera[i].idPelicula) {
        for (let index = 0; index < infoCine.length; index++) {
          if (infoCartelera[i].idCine === infoCine[index]._id) {
            if (validarPelicula(infoPelicula[j]._id, infoCartelera[i].tipo)) {
              var datoHorario = {
                "idCartelera": infoCartelera[i]._id,
                "horario": infoCartelera[i].horario,
                "pelicula": infoPelicula[j]._id,
                "tipo": infoCartelera[i].tipo
              }
              datosHorarios.push(datoHorario);
            } else {
              var dato = {
                "idCartelera": infoCartelera[i]._id,
                "img": infoPelicula[j].img,
                "pelicula": infoPelicula[j]._id,
                "nombre": infoPelicula[j].nombre,
                "clasificacion": infoPelicula[j].clasificacion,
                "tipo": infoCartelera[i].tipo,
                "duracion": infoPelicula[j].duracion,
                "sinopsis": infoPelicula[j].sinopsis,
                "cine": infoCine[index]._id,
                "estado": infoCine[index].estado,
                "fechaIni": infoCartelera[i].fechaIni,
                "fechaFin": infoCartelera[i].fechaFin,
                "sala": infoCartelera[i].idSala
              }
              datosGeneral.push(dato);
              var datoHorario = {
                "idCartelera": infoCartelera[i]._id,
                "horario": infoCartelera[i].horario,
                "pelicula": infoPelicula[j]._id,
                "tipo": infoCartelera[i].tipo
              }
              datosHorarios.push(datoHorario);
            }
          }
        }
      }
    }
  }
}

function llenarInfo() {
  for (let j = 1; j < datosHorarios.length; j++) {
    if (datosHorarios[j].idCartelera === cartelera) {
      document.getElementById("horario").innerHTML = datosHorarios[j].horario;
      for (let i = 1; i < datosGeneral.length; i++) {
        if (datosGeneral[i].pelicula === datosHorarios[j].pelicula) {
          document.getElementById("clasificacion").innerHTML = datosGeneral[i].clasificacion;
          document.getElementById("tipo").innerHTML = datosGeneral[i].tipo;
          document.getElementById("duracion").innerHTML = datosGeneral[i].duracion + " min";
        }
      }
    }

  }
  document.getElementById("total").innerHTML = totalP;
}

cargarTarjetas();

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
      console.log(data);
      var itemtarjeta = document.getElementById("tableBody");
      for (let i = 0; i <= data.length; i++) {
        var tarjetas = "<tr > <td class='texto'>" + data[i].NombreTarjeta + "</td> <td class='texto'>" + data[i].ultDig + "</td> <td class='texto'>" + data[i].Vence + "</td><td class='texto'> <button onclick='seleccionarTarjeta(this)'><i class='fas fa-check-square'></i></button></td></tr>";
        itemtarjeta.insertAdjacentHTML("beforeend", tarjetas)
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}

function seleccionarTarjeta(td) {
  var filaSeleccionada = td.parentNode.parentNode;
  var idTarjeta = filaSeleccionada.cells[0].id;
  Swal.fire({
    title: 'Tarjeta seleccionada',
    text: "Desea realizar la compra con la tarjeta seleccionada?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      window.location.href = "/HTML/viscompratickete.html?idF="+facturaId+"&boletos="+boletos;

    }
  });
}
function llevar(){
  window.location.href = "/HTML/agregarMetodoPago.html?idF="+facturaId+"&boletos="+boletos;

}