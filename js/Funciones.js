const Ficha = require("./Ficha.js");

/**
 *Evalua que jugador se a quedado sin fichas 
 * eso significa que gano 
 */
const sinFichas = (jugadores) => {
    for (let index = 0; index < jugadores.length; index++) {
        const jugador = jugadores[index];
        if (jugador.fichas.length == 0) {
            return index;
        }
    }
    return -1;
};

/**
 *Crea las fichas del juego 
 */
const crearFichas = () => {
    let fichas = [];
    for (let face1 = 0; face1 < 7; face1++) {
        for (let face2 = face1; face2 < 7; face2++) {
            fichas.push(new Ficha(face1, face2));
        }
    }
    return fichas;
};

exports.crearFichas = crearFichas;
exports.sinFichas = sinFichas;