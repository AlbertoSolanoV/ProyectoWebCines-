//Para que se cambie el nombre del cliente en el inicio

//Accedemos a los valores
var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var idCliente = localStorage.getItem("id");
var cineJefe = localStorage.getItem("CineEncargado");
var idRango = localStorage.getItem("rango");
var cineJefe = "";
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente

if (idRango === "3") {
  document.getElementById("menuAdmin").innerHTML = " <li><a class='texto' href='adminUsuarios.html'> Informe y estadísticas</a></li><li><a class='texto' href='margen.html'> Margen de ganancias</a></li><li><a class='texto' href='adminCadenasCines.html'> Cadenas de cine</a></li><li><a class='texto' href='Adminsalas.html'> Disponibilidad de espacios</a></li> <li><a class='texto' href='carteleraAdministrador.html'> Cartelera</a></li><li><a class='texto' href='adminColaboradores.html'> Colaboradores</a></li>";
} else if (idRango === "2") {
  document.getElementById("menuAdmin").innerHTML = " <li><a class='texto' href='carteleraAdministrador.html'> Cartelera</a></li>";

}

var idPelicula = "";
var modificarID = false;
var imagenC = document.getElementById("imagen");
var img = "";
var direccionImg = "";

imagenC.addEventListener("change", function () {
  const foto = this.files[0];
  img = foto;
  direccionImg = foto.name;
});
//Para mostrar las peliculas nuevas
fetch("http://localhost:5000/peliculas/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    //para llenar la tabla y las listas de cartelera
    var itemInfo = document.getElementById("infoTabla");
    for (let i = 0; i < data.length; i++) {
      var infoCartelera = "<tr><td class='texto' id=" + data[i]._id + ">" + data[i].nombre + "</td> <td class ='texto'> " + data[i].categoria + " </td> <td class = 'texto' > " + data[i].clasificacion + "</td> <td class = 'texto' > " + data[i].duracion + " </td> <td class = 'texto' > <img class='imagen' src= ../IMG/peliculas/" + data[i].img + " alt='Imagen Pelicula'> </td> <td class = 'texto'> " + data[i].sinopsis + " </td> <td><i class='fas fa-edit'onclick='modificar(this)'></i> <i class='fas fa-trash-alt' onclick='eliminarPeli(this)'></i></td> </tr>";
      itemInfo.insertAdjacentHTML("beforeend", infoCartelera);
      var itemPelicula = document.getElementById("PeliculasCarte");
      var infoPelicula = "<option value=" + data[i]._id + ">" + data[i].nombre + "</option>";
      itemPelicula.insertAdjacentHTML("beforeend", infoPelicula);
    }
  }
);

//Validacion push

function agregar(nombreinfo, duracioninfo, categoriainfo, clasificacioninfo, imageninfo, sinopsisinfo) {
  //Codigo que llama el api y valida la informacion
  var data = {
    nombre: nombreinfo,
    duracion: duracioninfo,
    categoria: categoriainfo,
    clasificacion: clasificacioninfo,
    imagen: imageninfo,
    sinopsis: sinopsisinfo
  };
  console.log(data);
  fetch('http://localhost:5000/peliculas/insertar', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (texto) {

      if (texto === "Error al registrar pelicula") {
        Swal.fire({
          title: 'Error',
          text: texto,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;

      } else {
        Swal.fire({
          title: 'Correcto',
          text: 'Su registro ha sido un exito',
          icon: 'success',
          confirmButtonText: 'ok'
        });
        limpiar();
        return true;
      }
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

/**
 * Nombre de la función: Capturar datos
 * Función: Obtendrá todos los datos del HTML y de aquí empezará a hacer las validaciones mediante
 * el uso de otras funciones (que se explicarán más adelante en el camino) que tendrán una tarea específica.
 * Una vez concluida las verificaciones de datos con exito, el sistema mostrará un Sweetalert corroborando
 * que el registro fue exitoso.
 */

function capturarDatos() {
  /*
  Orden de las funciones
  1 - Definir e inicializar varible
   */
  var nombreC = document.getElementById("nombre").value;
  var duracionC = document.getElementById("duracion").value;
  var categoriaC = document.getElementById("categoria").value;
  var clasificacionC = document.getElementById("clasificacion").value;
  var sinopsisC = document.getElementById("sinopsis").value;


  if (validarDatos(nombreC, duracionC, categoriaC, clasificacionC, direccionImg, sinopsisC)) {
    /*Aqui va la llamada a editar margen*/

    if (modificarID) {
      Sendmodificar(nombreC, duracionC, categoriaC, clasificacionC, direccionImg, sinopsisC);
      document.getElementById("agregarbtn").value = "Agregar";
      guardarImagen();
      location.reload();
    } else {
      agregar(nombreC, duracionC, categoriaC, clasificacionC, direccionImg, sinopsisC);
      guardarImagen();
      location.reload();
    }

  } else {
    Swal.fire({
      title: 'Incorrecto',
      text: 'Favor revisar los campos',
      icon: 'error',
      confirmButtonText: 'ok'
    });
  }
  return false;

}

function validarDatos(nombre, duracion, categoria, clasificacion, imagen, sinopsis) {
  console.log(nombre, duracion, categoria, clasificacion, imagen, sinopsis);

  var valor = true;

  if (nombre == '') {

    valor = false;
  } else if (categoria == '') {

    valor = false;
  } else if (clasificacion == '') {

    valor = false;
  } else if (imagen == '') {

    valor = false;
  } else if (sinopsis == '') {

    valor = false;
  }
  return valor;
}

function modificar(td) {
  document.getElementById("agregarbtn").value = "Modificar";
  modificarID = true;
  var filaSeleccionada = td.parentElement.parentElement;
  idPelicula = filaSeleccionada.cells[0].id;

  document.getElementById("nombre").value = filaSeleccionada.cells[0].innerHTML;
  document.getElementById("duracion").value = parseInt(filaSeleccionada.cells[3].innerHTML);
  console.log(filaSeleccionada.cells[1].innerHTML);
  document.getElementById("categoria").value = filaSeleccionada.cells[1].innerHTML.trim();
  document.getElementById("clasificacion").value = filaSeleccionada.cells[2].innerHTML.trim();
  document.getElementById("sinopsis").value = filaSeleccionada.cells[5].innerHTML;

}

function Sendmodificar(nombre, duracion, categoria, clasificacion, imagen, sinopsis) {
  var data = {
    id: idPelicula,
    nombre: nombre,
    duracion: duracion,
    categoria: categoria,
    clasificacion: clasificacion,
    imagen: imagen,
    sinopsis: sinopsis
  };

  fetch('http://localhost:5000/peliculas/modificar', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text === "Error al actualizar pelicula") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;
      } else if (text === "Pelicula actualizada con exito") {
        Swal.fire({
          title: 'Correcto',
          text: text,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        modificarID = false;
        limpiar();
 
        return true;
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors

}

function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("duracion").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("clasificacion").value = "";
  document.getElementById("sinopsis").value = "";
  document.getElementById("imagen").value = "";
}

function eliminarPeli(td) {
  var filaSeleccionada = td.parentElement.parentElement;
  var idPelicula = filaSeleccionada.cells[0].id;

  var data = {
    id: idPelicula
  };

  Swal.fire({
    title: 'Seguro que desea eliminar la película?',
    text: "No se podra cancelar",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      fetch('http://localhost:5000/peliculas/eliminar', {
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
          if (text === "Error al eliminar Pelicula") {
            Swal.fire({
              title: 'Ocurrio un error',
              text: text,
              icon: 'error'
            });
          } else {
            Swal.fire(
              'Eliminado!',
              'La película ha sido eliminada.',
              'success'
            )
            location.reload();
          }
        }).catch(err => console.log('Request Failed', err)); // Catch errors
    }
  });
}

//Incio para cartelera
var cineInpCartelera = document.getElementById("cinesCartelera");
var salasInpCartelera = document.getElementById("salasCartelera");
var horariosInpCartelera = document.getElementById("Horarios");
var peliulasInpCartelera = document.getElementById("PeliculasCarte");
var fechaIniCartelera = document.getElementById("CalendarioIncio");
var fechaFinCartelera = document.getElementById("CalendarioFin");
var salasSelect = [];
var horariosSelect = [];

//Para mostrar las peliculas nuevas
fetch("http://localhost:5000/cines/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    //para llenar la tabla y las listas de cartelera
    var itemInfo = document.getElementById("cinesCartelera");
    for (let i = 0; i < data.length; i++) {
      if (cineJefe !== null) {
        if (data[i].estado === "1") {
          var infoCartelera = "<option class='texto' value=" + data[i]._id + ">" + data[i].nombre + "</option>";
          itemInfo.insertAdjacentHTML("beforeend", infoCartelera);
        }
      } else {
        if (cineJefe === data[i]._id) {
          var infoCartelera = "<option class='texto' value=" + data[i]._id + ">" + data[i].nombre + "</option>";
          itemInfo.insertAdjacentHTML("beforeend", infoCartelera);
        }
      }

    }
  }
);

function cineSeleccionado() {
  llenarSalas(cineInpCartelera.value);
  llenarTablaCartelera(cineInpCartelera.value);
}

function llenarSalas(idCine) {
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
      var itemInfo = document.getElementById("salasCartelera");
      itemInfo.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].estado === "1") {
          var infoCartelera = "<option class='texto' value=" + data[i]._id + ">Sala " + i + "</option>";
          itemInfo.insertAdjacentHTML("beforeend", infoCartelera);
        }
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}



function agregarCartelera() {
  if (validarCartelera(cineInpCartelera.value, salasInpCartelera.value, horariosInpCartelera.value, peliulasInpCartelera.value, fechaIniCartelera.value, fechaFinCartelera.value)) {

    if (SendagregarCartelera(cineInpCartelera.value, getSalasSelected(salasInpCartelera), getHorariosSelected(horariosInpCartelera), peliulasInpCartelera.value, fechaIniCartelera.value, fechaFinCartelera.value)) {
      Swal.fire({
        title: 'Exito',
        text: 'Carteleras creadas con exito',
        icon: 'success',
        confirmButtonText: 'ok'
      });
      location.reload();
    }
  }
  return false;
}

// select is an HTML select element
function getSalasSelected(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}
// select is an HTML select element
function getHorariosSelected(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i = 0, iLen = options.length; i < iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function validarCartelera(cine, sala = [], horario = [], pelicula, fechaIni, fechaFin) {
  var mensaje = "";

  if (cine === "") {
    mensaje = mensaje + "Debe seleccionar un cine";
  }
  if (sala === "") {
    mensaje = mensaje + "Debe seleccionar mínimo una sala";
  }
  if (horario === "") {
    mensaje = mensaje + "Debe seleccionar un horario";
  }
  if (pelicula === "") {
    mensaje = mensaje + "Debe seleccionar una pelicula";
  }
  //Validar fecha
  var hoy = new Date();
  var d = hoy.getDate();
  var m = hoy.getMonth() + 1;
  var y = hoy.getFullYear();

  if (d < 10) {
    d = "0" + d;
  };
  if (m < 10) {
    m = "0" + m;
  };

  data = y + "-" + m + "-" + d;
  if (fechaIni <= data) {
    mensaje = mensaje + "La fecha de inicio tiene que ser anterior a la fecha final";
  }
  if (fechaFin <= fechaIni) {
    mensaje = mensaje + "La fecha de finalizacion no puede ser igual a la fecha actual ni menor a la fecha inicial";
  }

  if (mensaje != "") {
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

function SendagregarCartelera(cine, sala, horario, pelicula, fechaIni, fechaFin) {
  //Para tener la info de salas
  var data = {
    idCine: cine,
  };
  console.log(data);
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
    .then(function (json) {
      //Para hacer la cartelera
      for (let j = 0; j < sala.length; j++) {
        for (let i = 0; i < json.length; i++) {
          if (json[i]._id === sala[j]) {
            for (let h = 0; h < horario.length; h++) {
              var dataCartelera = {
                idSala: sala[j],
                idCine: cine,
                horario: horario[h],
                fechaFin: fechaFin,
                fechaIni: fechaIni,
                tipo: json[i].tipo,
                pelicula: pelicula
              };
              console.log(dataCartelera);
              fetch('http://localhost:5000/carteleras/insertar', {
                  method: "post",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(dataCartelera)
                })
                .then(function (response) {
                  return response.json();
                })
                .then(function (datosCartelera) {
                  //para agregar las butacas
                  var dataSala = {
                    sala: sala[j]
                  };
                  console.log(dataSala);
                  fetch('http://localhost:5000/butacas/buscarButacas', {
                      method: "post",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(dataSala)
                    })
                    .then(function (response) {
                      return response.json();
                    })
                    .then(function (butacasInfo) {
                      for (let bu = 0; bu < butacasInfo.length; bu++) {
                        var databutacas = {
                          idButaca: butacasInfo[bu]._id,
                          idCartelera: datosCartelera._id
                        };
                        console.log(databutacas);
                        fetch('http://localhost:5000/butacas_cartelera/insertar', {
                            method: "post",
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(databutacas)
                          })
                          .then(function (response) {
                            return response.json();
                          })
                          .then(function (json) {

                            return true;
                          })
                          .catch(err => console.log('Request Failed', err)); // Catch errors
                      }
                    })
                    .catch(err => console.log('Request Failed', err)); // Catch errors
                })
                .catch(err => console.log('Request Failed', err)); // Catch errors
            }
          }
        }
      }

    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function llenarTablaCartelera(cine) {
  //Para mostrar las peliculas nuevas
  var info = {
    id: cine
  };

  fetch('http://localhost:5000/carteleras/buscarCarteleraCine', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var itemCarte = document.getElementById("salasCarteleraTa");
      itemCarte.innerHTML = "";
      itemCarte.innerHTML = "<table class='tabla' id='salasCarteleraTa'><tr><th class='texto'><strong>Codigo</strong></th><th class='texto'><strong>Pelicula</strong></th><th class='texto'><strong>Horario</strong></th><th class='texto'><strong>Fecha Inicio</strong></th><th class='texto'><strong>Fecha Fin</strong></th></tr></table>";
      for (let i = 0; i < data.length; i++) {
        var itemCartelera = "<tr><td class='texto'>" + data[i]._id + "</td><td class='texto'>" + data[i].idPelicula + "</td><td class='texto'>" + data[i].horario + "</td><td class='texto'>" + data[i].fechaIni + "</td><td class='texto'>" + data[i].fechaFin + "</td></tr>";
        itemCarte.insertAdjacentHTML("beforeend", itemCartelera);
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}

function guardarImagen() {
  var data = new FormData();
  data.append('myFile', img);
  console.log(data);

  fetch('http://localhost:5000/imagenes/insertarImgPelicula', {
      method: "post",
      body: data
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      if (text === "Error") {
        Swal.fire({
          title: 'Error',
          text: "Error al guardar imagen",
          icon: 'warning',
          confirmButtonText: 'ok'
        });
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors
}