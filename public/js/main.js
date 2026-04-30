//Funcion apara cambiar de seccion sin recargar pagina
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
        body: JSON.stringify({ destino: detalle})

    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log("Servidor confirmo: ", datos.mensaje);
    })
    .catch(error => {
        console.error("Error de conexion: ", error);
    });
}