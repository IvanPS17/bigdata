// ==========================================
// SIMULADOR DE TRÁFICO (Carga de Datos)
// ==========================================

// Datos falsos para generar variedad
const destinosDisponibles = ['Japon', 'Europa', 'Playa'];
const usuariosFalsos = [
    'juanito@uabc.edu.mx', 'jpedro@uabc.edu.mx', 'profe@uabc.edu.mx', 
    'invitado1@gmail.com', 'invitado2@gmail.com'
];

// Si lo subes a AWS, cambias este localhost por tu URL de Elastic Beanstalk
const URL_SERVIDOR = 'http://localhost:3000/api/clics'; 

async function dispararClicAleatorio() {
    // Escogemos un usuario y un destino al azar
    const destinoRandom = destinosDisponibles[Math.floor(Math.random() * destinosDisponibles.length)];
    const usuarioRandom = usuariosFalsos[Math.floor(Math.random() * usuariosFalsos.length)];

    try {
        // Hacemos la petición POST tal cual como lo haría el Frontend
        const respuesta = await fetch(URL_SERVIDOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destino: destinoRandom, correo: usuarioRandom })
        });

        if (respuesta.ok) {
            console.log(`🚀 [SIMULADOR] Envió: ${usuarioRandom} -> ${destinoRandom}`);
        }
    } catch (error) {
        console.error(`❌ Error de conexión. ¿Está prendido tu server.js?`);
    }
}

// Función maestra para controlar la ráfaga
function iniciarAtaque(cantidadDePeticiones, milisegundosEntrePeticion) {
    console.log(`\n🔥 INICIANDO SIMULACIÓN DE TRÁFICO...`);
    console.log(`Se enviarán ${cantidadDePeticiones} clics en total.\n`);
    
    let peticionesEnviadas = 0;

    // setInterval repite la función cada X milisegundos
    const rafaga = setInterval(() => {
        dispararClicAleatorio();
        peticionesEnviadas++;

        // Cuando llegamos al límite, detenemos el temporizador
        if (peticionesEnviadas >= cantidadDePeticiones) {
            clearInterval(rafaga);
            console.log(`\n✅ SIMULACIÓN COMPLETADA. Revisa la terminal de tu servidor.`);
        }
    }, milisegundosEntrePeticion); 
}

iniciarAtaque(50, 100);