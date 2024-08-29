const Vehicle = require('./vehicle');

class Car extends Vehicle {
    #nbDoors;

    constructor(enginePower, nbDoors) {
        super(4, enginePower);

        this.nbDoors = nbDoors;
    }

    get nbDoors() {
        return this.#nbDoors;
    }

    set nbDoors(nbDoors) {
        if (!Number.isInteger(nbDoors)) {
            throw Error("La propriété nbDoors doit être un nombre entier");
        }

        this.#nbDoors = nbDoors;
    }

    // La fonction toString existait déjà dans la classe mère, mais je l'ai quand même réécrite... Pourquoi ?
    // Si je ne l'avais pas mis, ça aurait eu le comportement défini dans Vehicle.
    // En la ré-écrivant, j'ai SURCHARGÉ la méthode, afin de changer son fonctionnement, pour les Voitures.
    toString() {
        let result = `Voiture ${this.nbDoors} portes avec un moteur de ${this.enginePower} chevaux,`;
        result += this.isStarted ? ' est démarré.' : " n'est pas démarré.";

        return result;
    }
}

// const maCaisse = new Car(90, 5);
// maCaisse.start();
// console.log(maCaisse.toString());
// console.log(maCaisse.nbDoors);

module.exports = Car;