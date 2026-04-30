// Función que simula el clic de un usuario
async function enviarClicFalso() {
    try {
        // Hacemos la misma petición que haría un navegador web
        await fetch('http://localhost:3000/api/clics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Este es el paquetito de datos
            body: JSON.stringify({ destino: 'Japon' }) 
        });
    } catch (error) {
        console.log("Error al conectar con el servidor.");
    }
}

console.log("🔥 Arrancando el simulador de Big Data...");

// Disparamos la función enviarClicFalso cada 100 milisegundos (10 por segundo)
// Puedes bajarle el número a 10 o 5 para que parezca un ataque masivo
setInterval(() => {
    enviarClicFalso();
}, 5);