const express = require('express');
const fs = require('fs');
const app = express();

// Permite al servidor entender datos en formato JSON
app.use(express.json());
app.use(express.static('public'));

let interaccionesPorUsuario = {};
let totalClicsGlobales = 0;
let conteoDestinos = {
    Japon: 0,
    Europa: 0,
    Playa: 0
};

app.post('/api/clics', (req, res) => {
    const destino = req.body.destino;
    const correo = req.body.correo;
    const fecha = new Date().toLocaleString();

    const lineaCSV = `${fecha}, ${correo}, ${destino}\n`;

    fs.appendFileSync('registro_clics.csv', lineaCSV);
    if (conteoDestinos[destino] !== undefined) {
            conteoDestinos[destino]++;
            totalClicsGlobales++;
        }
    if(!interaccionesPorUsuario[correo]) {
        interaccionesPorUsuario[correo] = {
            total: 0,
            historial: {
                
            }
        };
    }

    if(!interaccionesPorUsuario[correo].historial[destino]) {
        interaccionesPorUsuario[correo].historial[destino] = 0;
    }
    interaccionesPorUsuario[correo].total++;
    interaccionesPorUsuario[correo].historial[destino]++;

    
    
    console.log(`📊 [Log] ${correo} navegó a: ${destino}. `);
    console.log(`👤 [INDIVIDUAL] ${correo} lleva ${interaccionesPorUsuario[correo].total} clics en total.`);
    //POR USUARIO
    if (interaccionesPorUsuario[correo].total === 3){
        let favorito = "";
        let maxClics = 0;

        for (const dest in interaccionesPorUsuario[correo].historial) {
            if(interaccionesPorUsuario[correo].historial[dest] > maxClics)
            {
                maxClics = interaccionesPorUsuario[correo].historial[dest];
                favorito = dest;
            }
        }
        console.log(`\n [MARKETING AUTO] El usuario ${correo} llegó a 3 clics. `);
        console.log(`-> Su destino favorito es ${favorito.toUpperCase()}. Eviando cupon de descuento para ${favorito}...`);
    }
    //GLOBAL
    if (totalClicsGlobales > 0 && totalClicsGlobales % 10 === 0) {
        let destinoTrending = "";
        let maxGlobal = 0;

        for(const dest in conteoDestinos) {
            if (conteoDestinos[dest] > maxGlobal) {
                maxGlobal = conteoDestinos[dest];
                destinoTrending = dest;
            }
        }

        console.log(`\n======================================================`);
        console.log(`📈 [ALERTA GLOBAL] Hemos alcanzado ${totalClicsGlobales} clics totales.`);
        console.log(`🔥 El destino en TENDENCIA ahora mismo es: ${destinoTrending.toUpperCase()} con ${maxGlobal}interacciones.`);
        console.log(`\n======================================================`);

    }
   
    
    res.send({ mensaje: "Dato procesado en el servidor"});

})

app.listen(3000, () => {
    console.log(` Servidor analitico de Big Data encendido `);
});
