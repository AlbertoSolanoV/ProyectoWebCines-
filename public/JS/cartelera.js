var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');
var id = document.getElementById('id');
//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}


//Para la fecha en el buscador
var hoy = new Date(),
  d = hoy.getDate(),
  m = hoy.getMonth() + 1,
  y = hoy.getFullYear(),
  data;

if (d < 10) {
  d = "0" + d;
};
if (m < 10) {
  m = "0" + m;
};

data = y + "-" + m + "-" + d;
console.log(data);
document.getElementById("fecha").value = data;
//fin de fecha en el buscador



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
  "cine": "",
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
            //Para el cine
            let params = new URLSearchParams(location.search);
            var cine = params.get('idcine');
            if (cine !== null) {
              filtroCine(cine);
            } else {
              mostrarTodo();
            }
          }
        );
      }
    );
  }
);

//Para mostrar cines
//Para mostrar los cine
fetch("http://localhost:5000/cines/listar").then(
  function (response) {
    return response.json();
  }).then(
  function (data) {
    var itemCine = document.getElementById("cines");
    for (let i = 0; i <= data.length; i++) {
      console.log(data[i].estado)
      if (data[i].estado == "1") {
        var cine = "<option class='texto' value=" + data[i].nombre + " data-id=" + data[i]._id + " name=" + data[i].nombre + "> " + data[i].localizacion + " </option>";

        itemCine.insertAdjacentHTML("beforeend", cine)

      }
    }
  }
);

function validarPelicula(idPelicula, tipo, cine) {
  for (let peli = 1; peli < datosGeneral.length; peli++) {
    if (datosGeneral[peli].pelicula === idPelicula && datosGeneral[peli].tipo === tipo && datosGeneral[peli].cine === cine) {
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
            if (fechaFiltro(infoCartelera[i].fechaIni, infoCartelera[i].fechaFin)) {
              if (validarPelicula(infoPelicula[j]._id, infoCartelera[i].tipo, infoCartelera[i].idCine)) {
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
                  "cine": infoCartelera[i].idCine,
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
  console.log(datosGeneral);
  console.log(datosHorarios);

}


function mostrarTodo() {
  var itemCartelera = document.getElementById("peliCartelera");
  try {
    for (let i = 1; i < datosGeneral.length; i++) {
      var imgPelicula = "<div class='contenedorMainPelicula flex' id='pelicula" + i + "'><div class='capaDosImg flex-30 flex'><img src='../IMG/Peliculas/" + datosGeneral[i].img + "' class='imgPelicula'></div>";
      itemCartelera.insertAdjacentHTML("beforeend", imgPelicula);

      var continuapelicula = document.getElementById("pelicula" + i);
      var contentinfo = "<div class='capaTresInfo flex-70 flex' id='content" + i + "'> </div>";
      continuapelicula.insertAdjacentHTML("beforeend", contentinfo);

      var infoPeli = document.getElementById("content" + i);
      var infoPeliculaCartelera = "<h2 class='titulo'>" + datosGeneral[i].nombre + "</h2><div class='containerPelicula flex' id='contentId" + i + "''> </div>";
      infoPeli.insertAdjacentHTML("beforeend", infoPeliculaCartelera);

      var content = document.getElementById("contentId" + i);
      var contentdentro = "<div class='infoPelicula flex-30'><ul class='infoDos flex' id= 'horariosid" + i + "'><li class='texto'>" + datosGeneral[i].clasificacion + "</li><li class='texto'>" + datosGeneral[i].tipo + "</li><li class='texto'>" + datosGeneral[i].duracion + " min</li><li class='texto' id= 'horariosid" + i + "'>Horarios:</li>";
      content.insertAdjacentHTML("beforeend", contentdentro);

      var infoHorarioContent = document.getElementById("horariosid" + i);
      for (let j = 1; j < datosHorarios.length; j++) {
        if (datosHorarios[j].pelicula === datosGeneral[i].pelicula && datosHorarios[j].tipo === datosGeneral[i].tipo) {
          var infoHorario = "<a href='compradetiquete.html?id=" + datosHorarios[j].idCartelera + "' ><li class='horario'>" + datosHorarios[j].horario + "</a>";
          infoHorarioContent.insertAdjacentHTML("beforeend", infoHorario);
        }
      }

      var infoPeliculaSegu = "</ul></div><div class='descripPelicula flex-70'><p class='texto'>" + datosGeneral[i].sinopsis + "</p></div></div>";
      content.insertAdjacentHTML("beforeend", infoPeliculaSegu);
    }
  } catch (error) {
    document.getElementById("peliCartelera").innerHTML = "<div class='contenedorMainPelicula'><p class = 'texto-blanco'> El cine no tiene carteleras en este momento </p> </div>"; //Para eliminar todas las carteleras en el html

  }

}

//Para filtrar por cine
function onInput() {
  var cine = document.getElementById("cines");
  var selectedOption = cine.options.namedItem(cineInput.value);
  if (selectedOption) {
    var selectedId = selectedOption.getAttribute('data-id');
    filtroCine(selectedId);
  }
}

//Para filtrar por fecha
function fechaFiltro(fechaIni, fechaFin) {
  var hoy = new Date(),
    d = hoy.getDate(),
    m = hoy.getMonth() + 1,
    y = hoy.getFullYear(),
    data;

  if (d < 10) {
    d = "0" + d;
  };
  if (m < 10) {
    m = "0" + m;
  };

  data = y + "-" + m + "-" + d;

  const isDateInRage = (startDate, endDate) => (dateToCheck) => {
    return dateToCheck >= startDate && dateToCheck <= endDate
  }

  const isInRangeOne = isDateInRage(fechaIni, fechaFin);
  if (isInRangeOne(data)) {
    console.log("no" + fechaIni + "y" + fechaFin);
    return false;
  } else {
    console.log("si" + fechaIni + "y" + fechaFin);
    return true;
  }

}

function filtroCine(idcine) {
  document.getElementById("peliCartelera").innerHTML = ""; //Para eliminar todas las carteleras en el html
  console.log(idcine);
  var tiene = false;
  var tiposala = document.getElementById("tipoSala").value;
  

  for (let i = 1; i < datosGeneral.length; i++) {
    console.log(datosGeneral[i].tipo);
    if (idcine === datosGeneral[i].cine && tiposala === datosGeneral[i].tipo) {
      tiene = true;
      var itemCartelera = document.getElementById("peliCartelera");
      var imgPelicula = "<div class='contenedorMainPelicula flex' id='pelicula" + i + "'><div class='capaDosImg flex-30 flex'><img src='../IMG/Peliculas/" + datosGeneral[i].img + "' class='imgPelicula'></div>";
      itemCartelera.insertAdjacentHTML("beforeend", imgPelicula);

      var continuapelicula = document.getElementById("pelicula" + i);
      var contentinfo = "<div class='capaTresInfo flex-70 flex' id='content" + i + "'> </div>";
      continuapelicula.insertAdjacentHTML("beforeend", contentinfo);

      var infoPeli = document.getElementById("content" + i);
      var infoPeliculaCartelera = "<h2 class='titulo'>" + datosGeneral[i].nombre + "</h2><div class='containerPelicula flex' id='contentId" + i + "''> </div>";
      infoPeli.insertAdjacentHTML("beforeend", infoPeliculaCartelera);

      var content = document.getElementById("contentId" + i);
      var contentdentro = "<div class='infoPelicula flex-30'><ul class='infoDos flex' id= 'horariosid" + i + "'><li class='texto'>" + datosGeneral[i].clasificacion + "</li><li class='texto'>" + datosGeneral[i].tipo + "</li><li class='texto'>" + datosGeneral[i].duracion + " min</li><li class='texto' id= 'horariosid" + i + "'>Horarios:</li>";
      content.insertAdjacentHTML("beforeend", contentdentro);

      var infoHorarioContent = document.getElementById("horariosid" + i);
      for (let j = 1; j < datosHorarios.length; j++) {
        if (datosHorarios[j].pelicula === datosGeneral[i].pelicula && datosHorarios[j].tipo === datosGeneral[i].tipo && datosHorarios[j].cine === datosGeneral[i].cine) {
          var infoHorario = "<a href='compradetiquete.html?id=" + datosHorarios[j].idCartelera + "' ><li class='horario'>" + datosHorarios[j].horario + "</a>";
          infoHorarioContent.insertAdjacentHTML("beforeend", infoHorario);
        }
      }

      var infoPeliculaSegu = "</ul></div><div class='descripPelicula flex-70'><p class='texto'>" + datosGeneral[i].sinopsis + "</p></div></div>";
      content.insertAdjacentHTML("beforeend", infoPeliculaSegu);
    }

  }
  if (!tiene) {
    document.getElementById("peliCartelera").innerHTML = "<div class='contenedorMainPelicula'><p class = 'texto-blanco'> El cine no tiene carteleras en este momento </p> </div>"; //Para eliminar todas las carteleras en el html
  }
  return false;
}