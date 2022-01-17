const Persona = require("./Persona.js");
const Ficha = require("./Ficha.js");
const Funciones = require("./Funciones.js");

//Declaramos a los jugadores de la partida
const jugadores = [
    new Persona("Daniel"),
    new Persona("Amairany"),
    new Persona("Santiago"),
    new Persona("Chabelo"),
];

for (let numberPartida = 0; numberPartida < 1000; numberPartida++) {
    //Creamos las fichas para el juego
    let fichasTotales = Funciones.crearFichas();
    //Revolvemos las fichas para el juego
    for (let fichaIndex = 0; fichaIndex < fichasTotales.length; fichaIndex++) {
        let origen = Math.round(Math.random() * (fichasTotales.length - 1));
        let destino = Math.round(Math.random() * (fichasTotales.length - 1));

        let fichaTemp = fichasTotales[origen];

        fichasTotales[origen] = fichasTotales[destino];
        fichasTotales[destino] = fichaTemp;
    }

    //Repartimos las fichasa los jugadores
    jugadores.forEach(jugador => {
        for (let fichaIndex = 0; fichaIndex < 5; fichaIndex++) {
            jugador.tomarFicha(fichasTotales);
        }
    });

    //Guardamos las fichas que estaran ocultas de los demas jugadores en "FichasOcultas".
    let fichasOcultas = fichasTotales; //Las fichas que sobraron son las fichas ocultas

    //El jugador que tenga la mula mas alta inicia el juego
    //Se debe de retirar una ficha al jugador
    let fichaInicio = null;
    let jugadorIndex = 0;
    for (let indexJuagdor = 0; indexJuagdor < jugadores.length; indexJuagdor++) {
        let fichaJugador = jugadores[indexJuagdor].masAlta();

        if (fichaInicio === null) {
            fichaInicio = fichaJugador;
            jugadorIndex = indexJuagdor;
        }
        if (fichaJugador.numeroAlto >= fichaInicio.numeroAlto ||
            fichaJugador.numeroAlto === fichaInicio.numeroAlto) {

            if (fichaJugador.esPar()) {
                fichaInicio = fichaJugador;
                jugadorIndex = indexJuagdor;
            }
        } else if (fichaJugador.esPar() && !fichaInicio.esPar()) {
            fichaInicio = fichaJugador;
            jugadorIndex = indexJuagdor;
        }
    }


    //Colocar en "MesaJuego" la mula mas alta para empezar a jugar
    let mesaJuego = [fichaInicio];
    jugadores[jugadorIndex].fichas.splice(
        jugadores[jugadorIndex].fichas.indexOf(fichaInicio),
        1);

    //Cambiamos el orden de los jugadores
    //Para que tenga sentido el ir sacando poniendo las fichas
    //de los jugadores.
    for (let index = 0; index < jugadorIndex; index++) {
        let jugadorCambio = jugadores.splice(0, 1)[0];
        jugadores.unshift(jugadorCambio);
    }
    /**
     * El sigueinte jugador debe colocar una ficha que coincida con los puntos de los
     *  exttremos de "MesaJuego"
     */
    let posInicio = 1;

    while (Funciones.sinFichas(jugadores) === -1) {
        for (let indexJugadores = posInicio; indexJugadores < jugadores.length; indexJugadores++) {
            let jugador = jugadores[indexJugadores];
            if (Funciones.sinFichas(jugadores) != -1) {
                break;
            }
            if (jugador.contieneFichas(mesaJuego)) {
                jugador.ponerFicha(mesaJuego)
            } else {
                //console.log("No tiene que poner");
                while (!jugador.contieneFichas(mesaJuego) & fichasOcultas.length != 0) {
                    jugador.tomarFicha(fichasOcultas);
                }
                jugador.ponerFicha(mesaJuego)
            }
        }
        posInicio = 0;
    }
    jugadores[Funciones.sinFichas(jugadores)].ganadas += 1;
}
console.log(jugadores);