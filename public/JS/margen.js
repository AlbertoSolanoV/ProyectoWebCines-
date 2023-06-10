var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');

//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente


// Variables para mostrar la informacion
var infoGeneral = [{
  "id": "",
  "cine": "",
  "mes": "",
  "iva": "",
  "porcentaje": "",
  "gananciaCade": "",
  "gananciaTotal": ""
}];

llenarInformacion();

async function cargarInformacionMargen() {
  //Para mostrar las ganancias nuevas
  const response = await fetch("http://localhost:5000/margenes/listar");
  const data = await response.json();
  return data;
}
async function cargarInformacionCine() {
  //Para mostrar las ganancias nuevas
  const response = await fetch("http://localhost:5000/cines/listar");
  const data = await response.json();
  return data;
}

async function llenarInformacion() {
  const infoMargen = await cargarInformacionMargen();
  const infoCines = await cargarInformacionCine();

  for (let i = 0; i < infoMargen.length; i++) {
    for (let j = 0; j < infoCines.length; j++) {
      if (infoMargen[i].idCine === infoCines[j]._id) {
        var dato = {
          "id": infoMargen[i]._id,
          "cine": infoCines[j].nombre,
          "mes": infoMargen[i].mes,
          "iva": infoMargen[i].IVA,
          "porcentaje": infoMargen[i].porcentajeGana,
          "gananciaCade": infoMargen[i].ganaciaCadena,
          "gananciaTotal": infoMargen[i].gananciaTotal
        }
        infoGeneral.push(dato);
      }
    }
  }
  mostrarInfor();
}

function mostrarInfor() {
  var itemInfo = document.getElementById("infoTabla");
  for (let i = 1; i < infoGeneral.length; i++) {
    var infoCadena = "<tr><td class='texto'>" + infoGeneral[i].cine + "</td> <td class ='texto'> " + infoGeneral[i].mes + " </td> <td class = 'texto' > " + infoGeneral[i].iva + "</td> <td class = 'texto' > " + infoGeneral[i].porcentaje + " </td> <td class = 'texto' > " + infoGeneral[i].gananciaCade + " </td> <td class = 'texto'> " + infoGeneral[i].gananciaTotal + " </td></tr>";
    itemInfo.insertAdjacentHTML("beforeend", infoCadena);
  }

  var itemInfoMod = document.getElementById("tablaModi");
  for (let i = 1; i < infoGeneral.length; i++) {
    var infoCadenaMod = "<tr><td class='texto' id=" + infoGeneral[i].id + "> " + infoGeneral[i].cine + "</td><td class='texto'>" + infoGeneral[i].mes + "</td><td class='texto'>" + infoGeneral[i].iva + "</td><td class='texto' id='porcentaje'" + i + "'><input  type='number' value=" + infoGeneral[i].porcentaje + " ></td><td class='texto'>" + infoGeneral[i].gananciaCade + "</td><td class='texto'>" + infoGeneral[i].gananciaTotal + "</td><td class='texto'> <button><i class='fas fa-edit' onclick='modificar(this)'></i></button></td></tr>";
    itemInfoMod.insertAdjacentHTML("beforeend", infoCadenaMod);
  }

}


/**
 * Nombre de la función: Capturar datos
 * Función: Obtendrá todos los datos del HTML y de aquí empezará a hacer las validaciones mediante
 * el uso de otras funciones (que se explicarán más adelante en el camino) que tendrán una tarea específica.
 * Una vez concluida las verificaciones de datos con exito, el sistema mostrará un Sweetalert corroborando
 * que el registro fue exitoso.
 */
const guardarCambios = document.querySelector("#guardarCambios");

function validarDatos(porcentaje) {
  console.log(porcentaje);

  if (porcentaje === '') {
    Swal.fire({
      title: 'Error',
      text: 'Porcentaje está en blanco',
      icon: 'error',
      confirmButtonText: 'ok'
    });
    return false;
  }
  return true;
}

function modificar(td) {
 
  var filaSeleccionada = td.parentNode.parentNode.parentNode;
  console.log(filaSeleccionada);
  idMargen = filaSeleccionada.cells[0].id;
  console.log(idMargen);

  var ganancia = parseInt(filaSeleccionada.cells[4].innerHTML);
  var porcentaje = parseInt(filaSeleccionada.cells[3].children[0].value);
  console.log(porcentaje);

  var cociente = 100;
  var gananciaFinal = (((porcentaje * cociente) / ganancia) * ganancia) + ganancia;
  

  Sendmodificar(porcentaje, gananciaFinal);
  location.reload

}



function Sendmodificar(porcentaje, gananciaTotal) {
  var data = {
    id: idMargen,
    porcentaje: porcentaje,
    gananciaTotal: gananciaTotal
  };

  fetch('http://localhost:5000/margenes/modificar', {
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
      if (text === "Error al actualizar ganancia") {
        Swal.fire({
          title: 'Error',
          text: text,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        return false;
      } else if (text === "Ganancias actualizadas con éxito") {
        Swal.fire({
          title: 'Correcto',
          text: text,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        limpiar();
        location.reload();
        return true;
      }
    }).catch(err => console.log('Request Failed', err)); // Catch errors

}

function limpiar() {
  document.getElementById("porcentaje").value = "";

}

