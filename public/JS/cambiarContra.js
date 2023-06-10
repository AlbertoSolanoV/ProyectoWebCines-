
const validar = () => {
  const inputContra = document.getElementById('contra').value;

  let error = false;

  let comprobacion = new RegExp("^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$");

  //ciclo que recorre todos los inputs requeridos
  console.log(inputContra);
  console.log(checkPassword(inputContra));

  if (!error) {
    //console.log("Error: " + mensaje);
    //Uso el Sweet Alert
    Swal.fire({
      'icon': 'Success',
      'title': 'Datos Correctos',
      'text': "Link enviado a la dirección de correo electrónico indicada",
      'confirmButtonText': 'Entendido'
    }).then(() => { //Este código se ejecuta cuando cerramos el sweet alert
      // window.location.href = ""; //falta
      console.log('Se cerró')
    });
  } else {
    //console.log("Error: " + mensaje);
    //Uso el Sweet Alert
    Swal.fire({
      'icon': 'warning',
      'title': 'Datos incorrectos',
      'text': "Por favor revise los campos resaltados",
      'confirmButtonText': 'Entendido'
    }).then(() => { //Este código se ejecuta cuando cerramos el sweet alert
      console.log('Se cerró')
    });
  };
  return false;
};

function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}