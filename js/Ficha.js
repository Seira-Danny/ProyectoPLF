/**
 *Esta clase representa las fichas del dominó
 *Se puede decir que...
 * El face1 =  posicion de arriba
 * El face2 =  posicion de abajo
 */
class Ficha {
    constructor(lado1, lado2) {
            this.face1 = lado1;
            this.face2 = lado2;
            this.numeroAlto = 0;

            if (this.face1 === this.face2) {
                this.numeroAlto = this.face1
            } else if (this.face1 > this.face2) {
                this.numeroAlto = this.face1;
            } else {
                this.numeroAlto = this.face2;
            }
        }
        /**
         *Metodo que invierte las posiciones
         *de los puntos de la ficha 
         */
    invertir() {
            let temp = this.face1;
            let face2 = this.face2;

            this.face1 = face2;
            this.face2 = temp;

        }
        /**
         *Comprueba si una ficha es par o no 
         */
    esPar() {
        return this.face1 === this.face2;
    }
}
module.exports = Ficha;