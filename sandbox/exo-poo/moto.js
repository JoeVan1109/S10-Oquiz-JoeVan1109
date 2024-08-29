const Vehicle = require('./vehicle');

// Le extends est le mot clé qui permet de créer un lien d'héritage entre 2 classes.
// Ici, Moto est une classe fille de Vehicle, elle en hérite.
// Moto peut profiter de ce que Vehicle met à sa disposition, comme par exemple la possibilité de démarrer,
// le fait d'avoir un nombre de roues, etc.

// Attention, un enfant n'a pas accès aux propriétés privates de sa mère (ni l'inverse d'ailleurs).
// De la même façon qu'un enfant n'est pas censé fouillé le portefeuille de sa mère sans demandé, une classe fille ne peut
// pas utiliser une propriété privée de sa mère sans lui demander (passer par les getters et setters par exemple).
class Moto extends Vehicle {
    #hasSideCar;

    constructor(enginePower, hasSideCar = false) {
        // La fonction "super" permet d'appeller/exécuter le constructeur de la classe mère.
        super(2, enginePower);

        this.hasSideCar = hasSideCar;
    }

    get hasSideCar() {
        return this.#hasSideCar;
    }

    set hasSideCar(hasSideCar) {
        if (typeof hasSideCar !== 'boolean') {
            throw Error("La propriété hasSideCar doit être un booléen");
        }

        this.#hasSideCar = hasSideCar;
    }

    toString() {
        let result = `Moto avec un moteur de ${this.enginePower} chevaux,`;
        result += this.hasSideCar ? ' avec sidecar,' : " sans sidecar,";
        result += this.isStarted ? ' est démarré.' : " n'est pas démarré.";

        return result;
    }
}

// const maBecane = new Moto(75, true);
// console.log(maBecane.toString());

module.exports = Moto;