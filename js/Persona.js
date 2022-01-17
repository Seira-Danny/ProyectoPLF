class Persona {

    constructor(nombre) {
        this.nombre = nombre; //Nombre del jugador
        this.fichas = [];
        this.fichaSelected = -1; //Ficha con la que jugará
        this.ganadas = 0; //# de partidas ganadas 
    }

    /**
     * Coloca una ficha en la mesa dependiendo 
     * de los puntos de las fichas de los extremos 
     */
    ponerFicha(mesaJuego) {
            let fichaEnJuego = this.fichas.splice(this.fichaSelected, 1)[0];
            //Antes de colocar la ficha debemos saber si va en 
            //en la parte superior o inferior de la "mesaJuego"
            let numberSuperior = mesaJuego[0].face1;
            if (fichaEnJuego.face2 === numberSuperior) {
                //Parte superior
                mesaJuego.unshift(fichaEnJuego);
            } else {
                //Parte inferiro
                mesaJuego.push(fichaEnJuego);
            }
            this.fichaSelected = -1;
        }
        /**
         * Regresa un valor booleano para saber si el jugador dispone de fichas 
         * * para jugar
         * @param fichasMesa son las fichas que están en juego
         *         visibles al jugador
         */
    contieneFichas(fichasMesa) {
            let numeroPuntosCima = fichasMesa[0].face1;
            let numeroPuntosFondo = fichasMesa[fichasMesa.length - 1].face2;

            for (let index = 0; index < this.fichas.length; index++) {
                let fichaTemp = this.fichas[index];
                if (fichaTemp.face2 === numeroPuntosCima ||
                    fichaTemp.face1 === numeroPuntosFondo) {
                    this.fichaSelected = index;
                    return true;
                }
                fichaTemp.invertir();
                if (fichaTemp.face2 === numeroPuntosCima ||
                    fichaTemp.face1 === numeroPuntosFondo) {
                    this.fichaSelected = index;
                    return true;
                }
            }
            return false;
        }
        /**
         * Esta funcion sirve para que un jugador pueda obtner una ficha 
         * de "FichasOcultas", cuando este no tengo fichas con las que jugar
         */
    tomarFicha(fichasOcultas) {
        this.fichas.push(fichasOcultas.pop());
    }


    /**
     * COn este metodo sabemos cual es la ficha 
     * con el valor mas alto que tiene un jugador.
     * Ya sean muchas o no
     */
    masAlta() {
        let parTemp = null;
        this.fichas.forEach(ficha => {
            if (ficha.esPar()) {
                if (parTemp === null) {
                    parTemp = ficha;
                } else {
                    if (parTemp.face1 < ficha.face2)
                        parTemp = ficha;
                }
            }
        });
        if (parTemp != null) {
            return parTemp;
        } else {
            let fichaTemp = null;

            this.fichas.forEach(ficha => {
                if (fichaTemp === null) {
                    fichaTemp = ficha;
                }
                if (ficha.numeroAlto > fichaTemp.numeroAlto) {
                    fichaTemp = ficha;
                }
            });
            return fichaTemp;
        }
    }
}
module.exports = Persona; //Con esto le indicamos a Node.js 
//Que usamos un módulo