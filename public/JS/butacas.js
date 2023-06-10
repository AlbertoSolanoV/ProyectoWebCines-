let params = new URLSearchParams(location.search);
var cartelera = params.get('id');
var totalP = params.get('total');
var boletos = params.get('boletos');

var nombreUser = localStorage.getItem("Nombre");
var idUser = localStorage.getItem("id");
var nombre = document.getElementById('userid');

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
llenarButacas();

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

function llenarButacas() {
    //Para mostrar las peliculas nuevas
    var data = {
        idCartelera: cartelera
    };

    fetch('http://localhost:5000/butacas_cartelera/buscarButacas', {
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
            console.log(json);
            var fila = document.getElementById("contentButacas");
            var columnasCant = parseInt(json.length) / 20;
            var posi = 0;
            for (posi; posi < columnasCant; posi++) {
                var filaData = " <div id=" + posi + " class='row'> </div>";
                fila.insertAdjacentHTML("beforeend", filaData)
            }
            var col = 0;
            var pos = 0;
            for (let index = 0; index < json.length; index++) {
                var columnas = document.getElementById(col);
                if (json[pos].estado === "1") {
                    var butaca = "<div onclick='Selecciona(this)' id=" + json[pos]._id + " class='seat textoBlanco'>" + index + "</div>";
                    columnas.insertAdjacentHTML("beforeend", butaca)
                } else {
                    var butaca = "<div onclick='Selecciona(this)' id=" + json[pos]._id + " class='seat sold textoBlanco'>" + index + "</div>";
                    columnas.insertAdjacentHTML("beforeend", butaca)
                }
                pos++;
                if (index == 20) {
                    index = 0;
                    col++;
                }
            }

        }).catch(err => console.log('Request Failed', err)); // Catch errors

}

function Selecciona(td) {
    cantSelec++;
    if (cantSelec > parseFloat(boletos)) {
        Swal.fire({
            title: 'Error',
            text: "Solo puede seleccionar la misma cantidad de butacas que de boletos",
            icon: 'warning',
            confirmButtonText: 'ok'
        });
    } else {
        var filaSelecctioanda = td;
        validarCampos(filaSelecctioanda)
        butacaSelec.push(filaSelecctioanda.id);
        console.log(butacaSelec);
    }


}

function validarCampos(estado) {
    estado.style.backgroundColor = "green";
}

function reservarCampos() {
    if (butacaSelec.length < parseInt(boletos)) {
        Swal.fire({
            title: 'Error',
            text: "Debe seleccionar las butacas",
            icon: 'error',
            confirmButtonText: 'ok'
        });

    } else {
        SendReservarButaca();
        guardarBoletosInfo();
        guardarInfoCompra();

    }
    console.log(butacaSelec);
    return false;
}

function SendReservarButaca() {
    for (let index = 0; index < butacaSelec.length; index++) {

        var data = {
            id: butacaSelec[index]
        }
        fetch('http://localhost:5000/butacas_cartelera/modificar', {
                method: "put",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                if (text === 'Error al actualizar butaca') {
                    Swal.fire({
                        title: 'Error',
                        text: "Ha sucedido un error, por favor refresque la página",
                        icon: 'error',
                        confirmButtonText: 'ok'
                    });
                } else {
                    Swal.fire({
                        title: 'Exito',
                        text: "Puede pasar a seleccionar método de pago",
                        icon: 'success',
                        confirmButtonText: 'ok'
                    });

                }

            }).catch(err => console.log('Request Failed', err)); // Catch errors

    }

}

function guardarBoletosInfo() {
    for (let index = 0; index < butacaSelec.length; index++) {

        var data = {
            idButaca: butacaSelec[index],
            idUser: idUser,
            idCartelera: cartelera
        }
        console.log(data);
        fetch('http://localhost:5000/boletos/insertar', {
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
                console.log(text);

            }).catch(err => console.log('Request Failed', err)); // Catch errors
    }
}

function guardarInfoCompra() {
    var data = {
        id: cartelera
    }
    fetch('http://localhost:5000/carteleras/buscarCartelera', {
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
            var cine = json[0].idCine;

            var data = {
                idCine: cine
            }
            fetch('http://localhost:5000/margenes/buscarMargen', {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (infoMarge) {
                    var porcentaje = parseInt(infoMarge[0].porcentajeGana);
                    var iva = parseInt(totalP) * 0.13;
                    var precioPorcentaje = (porcentaje / 100) * parseInt(totalP) ;
                    var total = parseInt(totalP) + iva + precioPorcentaje;

                    var data = {
                        total: total,
                        subTotal: totalP,
                        iva: iva,
                        servicio: precioPorcentaje,
                        idCliente: idUser
                    }
                    fetch('http://localhost:5000/facturas/insertar', {
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
                            var idFactura = json._id;
                            window.location.href = "/HTML/selecMetodoPago.html?idF=" + idFactura + "&id=" + cartelera + "&total=" + totalP+"&boletos="+boletos;

                        }).catch(err => console.log('Request Failed', err)); // Catch errors

                }).catch(err => console.log('Request Failed', err)); // Catch errors

        }).catch(err => console.log('Request Failed', err)); // Catch errors
}