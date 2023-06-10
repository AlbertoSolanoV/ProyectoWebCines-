var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');

//Ponemos el nombre el el campo
if (nombreUser != null) {
  nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}
//Fin de nombre cliente

var datosCines = new Array();
var campoNombre = document.getElementById("Nombre");
var campoLocalizacion = document.getElementById("Localizacion");
var campoLogo = document.getElementById("Logo");
var campoAccion = document.getElementById("Accion");
var peliModificar = {};
var btnModificar = document.getElementById("btnModificar");
var btnAgregar = document.getElementById("btnAgregar");
var idCine = "";
var direccionImg = "";
var img = "";

campoLogo.addEventListener("change", function () {
  const foto = this.files[0];
  img = foto;
  direccionImg = foto.name;
});


var getReferenciasDeCamposFormulario = () => {
  campoNombre = document.getElementById("Nombre");
  campoLocalizacion = document.getElementById("Localizacion");
  campoLogo = document.getElementById("Logo");
  campoAccion = document.getElementById("Accion");
}

var getCadenasById = peliID => peli => peli._id === peliID;
var getCadenasByName = peliNombre => peli => peli.nombre.toLowerCase() === peliNombre.toLowerCase();

var columnasTablaHTML = // html
  `
  <tr>
    <th class="texto"><strong>Nombre</strong></th>
    <th class="texto"><strong>Localización</strong></th>
    <th class="texto"><strong>Logo</strong></th>
    <th class="texto"><strong>Estado</strong></th>
    <th class="texto"><strong>Accion</strong></th>
  </tr>
`;

var createTableRow = data => //html
  `
  <tr >
    <td id = ${data?._id} class="texto"> ${data?.nombre} </td> 
    <td class="texto">${data?.localizacion} </td> 
    <td class="texto" ><img class="imagen" src="../IMG/cines/${data?.logo}" alt=""> </td> 
    <td class="texto" > ${data?.estado} </td> 
    <td class="texto">
      <i class="fas fa-edit" onclick="llenarModificarCarteleraFormulario(this)"></i>
      <i class="fas fa-trash-alt" onclick="eliminarPeli(this)"></i>
    </td>
  </tr>
`;

var llenarSelect = (selectElement, queryFilter) => {
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].text == queryFilter) {
      selectElement.options[i].selected = true;
      return;
    }
  }
}

var mostrarModificarBtn = () => {
  btnAgregar.setAttribute("hidden", true);
  btnModificar.removeAttribute("hidden");
}

var ocultarModificarBtn = () => {
  btnModificar.setAttribute("hidden", true);
  btnAgregar.removeAttribute("hidden");
}

var llenarModificarCarteleraFormulario = td => {
  var filaSeleccionada = td.parentElement.parentElement;
  idCine = filaSeleccionada.cells[0].id;

  mostrarModificarBtn();
  getReferenciasDeCamposFormulario();

  campoNombre.value = filaSeleccionada.cells[0].innerHTML;
  campoLocalizacion.value = filaSeleccionada.cells[1].innerHTML;
  //campoImagen.filename = peliModificar.Logo;

}


//Para mostrar las peliculas nuevas


function agregarPeli() {
  //var isValid = validar();
  //if(isValid) {
  var peli = {
    nombre: campoNombre.value,
    localizacion: campoLocalizacion.value,
    logo: direccionImg
  }
  PostRequest(peli);
  guardarImagen();
  //}

}

function modificarPelicula() {
  getReferenciasDeCamposFormulario();
  //var isValid = validar();
  //if(isValid) {
  var cine = {
    id: idCine,
    Nombre: campoNombre.value,
    Localización: campoLocalizacion.value,
    Logo: direccionImg
  }
  PutRequest(cine);
  guardarImagen();
  //}

}

function guardarImagen(){
  var data = new FormData();
  data.append('myFile', img);
  console.log(data);

  fetch('http://localhost:5000/imagenes/insertarImgCine', {
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


function PostRequest(data) {
  //Codigo que llama el api y valida la informacion
  console.log(data);
  fetch('http://localhost:5000/cines/insertar', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {

      return response.text();
    })
    .then((texto) => {
      if (texto === "Error al registrar cine") {
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
          text: texto,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        mostrarInfor();
        limpiar();
        return true;
      }
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}


function PutRequest(data) {
  //Codigo que llama el api y valida la informacion
  console.log(data);
  fetch('http://localhost:5000/cines/modificarInfo', {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      mostrarInfor();
      return response.text();
    })
    .then((texto) => {
      if (texto === "Error al actualizar cine") {
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
          text: texto,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        mostrarInfor();
        limpiar();
        return true;
      }
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}


var eliminarPeli = (td) => {
  var filaSeleccionada = td.parentElement.parentElement;
  idCine = filaSeleccionada.cells[0].id;
  fetch('http://localhost:5000/cines/cambiarEstado', {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idCine
      })
    })
    .then((response) => {
      mostrarInfor();
      return response.text();
    })
    .then((texto) => {
      if (texto === "Error al desabilitar cine") {
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
          text: texto,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        return true;
      }
    })
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function mostrarInfor() {
  fetch("http://localhost:5000/cines/listar").then(
    function (response) {
      return response.json();
    }).then((data) => {
    ocultarModificarBtn();
    datosCines = data;
    var itemInfo = document.getElementById("tablaPeliculas");
    var infoCine = `${columnasTablaHTML}`;
    for (let i = 0; i < datosCines.length; i++) {
      infoCine += `${createTableRow(datosCines[i])}`;
    }
    itemInfo.innerHTML = infoCine;
  });

}
mostrarInfor();

function limpiar() {
  campoNombre.value = "";
  campoLocalizacion.value = "";
  direccionImg = "";
  img = "";
  campoLogo.value = "";
}