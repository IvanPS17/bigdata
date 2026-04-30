const express = require('express');
const app = express();

// Permite al servidor entender datos en formato JSON
app.use(express.json());

app.use(express.static('public'));
let conteoDestinos = {
    Japon: 0,
    Europa: 0,
    Playa: 0
}

app.post('/api/clics', (req, res) => {
    const destino = req.body.destino;

    if (conteoDestinos[destino] !== undefined) {
        conteoDestinos[destino]++;

        // Imprimimos el conteo actual
        console.log(`📊 [Registro] Clic en ${destino} -> Total: ${conteoDestinos[destino]}`);

        // ¡LA LÓGICA DE ALERTA (Big Data en acción)!
        // Si detectamos exactamente 100 clics, disparamos una acción
        if (conteoDestinos[destino] === 100) {
            console.log(`\n======================================================`);
            console.log(`🔥 ¡ALERTA DE TENDENCIA DETECTADA EN TIEMPO REAL! 🔥`);
            console.log(`El destino ${destino} alcanzó 100 interacciones.`);
            console.log(`Generando y enviando correos de recomendación... 📧`);
            console.log(`======================================================\n`);
        }
    }
    res.send({ mensaje: "Dato procesado en el servidor"});

})

app.listen(3000, () => {
    console.log(" Servidor analitico de Big Data encendido (Puerto 3000)");
});
