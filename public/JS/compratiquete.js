let params = new URLSearchParams(location.search);
var cartelera = params.get('id');

var nombreUser = localStorage.getItem("Nombre");
var nombre = document.getElementById('userid');

//Ponemos el nombre el el campo
if (nombreUser != null) {
    nombre.innerHTML = "<a href='perfil.html' class='menu_item login' id='userid'>" + nombreUser + "</a>";
}

//Variables Edades numero 
let numterceraedad = 0; //Variable numero de tercera esdad
let numadulto = 0 //Variable numero de Adulto
let numnino = 0; //Variable numero de niño

//Variables Subtotal 
let subtotad = 0; //Variable subtotal Adulto
let subtotter = 0; //Variable subtotal tercera edad 
let subtotnin = 0; //Variable subtotal ninos 
let total = 0;


function terceraedad(accion) {
    if (accion === "menos") {
        if (numterceraedad == 0) {
            Swal.fire({
                title: 'Ocurrio un error',
                text: 'Esa es la menor cantidad',
                icon: 'error'
            });
        } else {
            numterceraedad--;
            document.getElementById("numtercera").innerHTML = numterceraedad;
            subtotter = subtotter - 2600;
            document.getElementById("totter").innerHTML = subtotter;
            var subtotal = document.getElementById("total");
            total = total - 2600;
            subtotal.innerHTML = total;
        }
    } else {
        numterceraedad++;
        document.getElementById("numtercera").innerHTML = numterceraedad;
        subtotter = subtotter + 2600;
        document.getElementById("totter").innerHTML = subtotter;
        var subtotal = document.getElementById("total");
        total = total + 2600;
        subtotal.innerHTML = total;
    }
}


function adulto(accion) {
    if (accion === "menos") {
        if (numadulto == 0) {
            Swal.fire({
                title: 'Ocurrio un error',
                text: 'Esa es la menor cantidad',
                icon: 'error'
            });
        } else {
            numadulto--;
            document.getElementById("adultonum").innerHTML = numadulto;
            subtotad = subtotad - 3300;
            document.getElementById("totad").innerHTML = subtotad;
            var subtotal = document.getElementById("total");
            total = total - 3300;
            subtotal.innerHTML = total;
        }
    } else {
        numadulto++;
        document.getElementById("adultonum").innerHTML = numadulto;
        subtotad = subtotad + 3300;
        document.getElementById("totad").innerHTML = subtotad;
        var subtotal = document.getElementById("total");
        total = total + 3300;
        subtotal.innerHTML = total;
    }
}

function ninoedad(accion) {
    if (accion === "menos") {
        if (numnino == 0) {
            Swal.fire({
                title: 'Ocurrio un error',
                text: 'Esa es la menor cantidad',
                icon: 'error'
            });
        } else {
            numnino--;
            document.getElementById("numnino").innerHTML = numnino;
            subtotnin = subtotnin - 2600;
            document.getElementById("totnin").innerHTML = subtotnin;
            var subtotal = document.getElementById("total");
            total = total - 2600;
            subtotal.innerHTML = total;
        }
    } else {
        numnino++;
        document.getElementById("numnino").innerHTML = numnino;
        subtotnin = subtotnin + 2600;
        document.getElementById("totnin").innerHTML = subtotnin;
        var subtotal = document.getElementById("total");
        total = total + 2600;
        subtotal.innerHTML = total;
    }

}

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

}

function continuar() {
    if (nombreUser === null) {
        Swal.fire({
            title: 'Error',
            text: 'Tiene que iniciar sesion antes de continuar',
            icon: 'error'
        });
    } else {
        if (valida()) {
            var boletos = numadulto + numnino + numterceraedad;
            window.location.href = "/HTML/butacas.html?id=" + cartelera + "&total=" + total + "&boletos=" + boletos;
        }
    }


    return false;
}

function valida() {
    if (total === 0) {
        Swal.fire({
            title: 'Error',
            text: 'Tiene que seleccionar al menos un boleto para continuar',
            icon: 'error'
        });
        return false;
    }
    return true;

}