//Funcion apara cambiar de seccion sin recargar pagina
let usuarioActual = "anonimo@uabc.edu.mx"
function iniciarSesion() {
    const correoIngresado = document.getElementById('correo-input').value;

    if(correoIngresado !== ""){
        usuarioActual = correoIngresado;
        
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('home').style.display = 'block';

    console.log(`[Frontend] Sesion inciada con ${usuarioActual}`);
    } else {
        alert("Favor de ingresar un correo para continuar");
    }
    
}
function irA(seccionId){
    const todasLasSecciones = document.querySelectorAll('section');

    todasLasSecciones.forEach(s => {
        s.style.display = 'none';

    });

    const seccionDestino = document.getElementById(seccionId);
    if(seccionDestino){
        seccionDestino.style.display = 'block';
    }
}

function enviarClic(detalle) {
    fetch('/api/clics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ destino: detalle, correo: usuarioActual})

    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log("Servidor confirmo: ", datos.mensaje);
    })
    .catch(error => {
        console.error("Error de conexion: ", error);
    });
}