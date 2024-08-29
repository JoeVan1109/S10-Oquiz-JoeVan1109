/*
On veut coder une classe Vehicule !!!

Propriétés:
- nbWheels
- enginePower
- isStarted

Méthodes:
- constructor(nbWheels, enginePower) // isStarted est false par défaut
- getters et setters de toutes les propriétés (pas de conditions dans les setters)
- start() et stop()
- toString() // renvoie "véhicule à X roues, avec un moteur de Y chevaux, {est démarré | n'est pas démarré}.

Bonus : Si on a le temps, on rajoute des conditions dans les setters !
*/

class Vehicle {
    #nbWheels;
    #enginePower;
    #isStarted = false;

    constructor(nbWheels, enginePower) {
        this.nbWheels = nbWheels;
        this.enginePower = enginePower;
    }

    get nbWheels() {
        return this.#nbWheels;
    }

    set nbWheels(nbWheels) {
        if (!Number.isInteger(nbWheels)) {
            throw Error("La propriété nbWheels doit être un nombre entier");
        }

        this.#nbWheels = nbWheels;
    }

    get enginePower() {
        return this.#enginePower;
    }

    set enginePower(enginePower) {
        if (!Number.isInteger(enginePower)) {
            throw Error("La propriété enginePower doit être un nombre entier");
        }

        this.#enginePower = enginePower;
    }

    get isStarted() {
        return this.#isStarted;
    }

    set isStarted(isStarted) {
        if (typeof isStarted !== 'boolean') {
            throw Error("La propriété isStarted doit être un booléen");
        }

        this.#isStarted = isStarted;
    }

    start() {
        this.isStarted = true;
    }

    stop() {
        this.isStarted = false;
    }

    toString() {
        let result = `Véhicule à ${this.nbWheels} roues, avec un moteur de ${this.enginePower} chevaux,`;
        result += this.isStarted ? ' est démarré.' : " n'est pas démarré.";

        return result;
    }
}

// const maCaisse = new Vehicle(4, 90);
// maCaisse.start();
// console.log(maCaisse.toString());
// maCaisse.stop();
// console.log(maCaisse.toString());

// const maMoto = new Vehicle(2, 75);
// maMoto.start();
// console.log(maMoto.toString());
// maMoto.stop();
// console.log(maMoto.toString());

module.exports = Vehicle;