// Par convension, dans une classe, on va respecter cet ordre :
// - Les propriétés (avec ou sans valeur par défaut)
// - Les méthodes, en commançant par le constructeur, suivi des getters & setters, puis les autres

// Getters & Setters
// 1. Pour éviter les erreurs de devs et bugs, la bonne pratique consiste à passer en PRIVATE toutes les propriétés d'une classe.
// 2. Mais en faisant ça, on n'a plus moyen de modifier ou récupérer la valeur des propriétés.
// 3. On crée donc un setter pour modifier la valeur de la property et un getter pour récupérer la valeur de la property.
// 4. On met des conditions de controle dans le setter.
// 5. Attention de bien passer par les setters, même depuis le constructeur.

// Getters & Setters : Analogie
// 1. Pour éviter que n'importe qui rendre dans ma boite de nuit, je vais construire des murs autour.
// 2. Mais en faisant ça, plus personne ne peut rentrer, je n'ai pas de portes.
// 3. On construit donc une porte pour pouvoir entrer et sortir.
// 4. Je veux quand même un controle à l'entré, je place un videur devant la porte.
// 5. Attention de ne pas laisser la fenetre ouverte, quelqu'un pourrait passer en douce.


class Person {
    // On commence par déclarer des propriétés
    #firstName;
    #lastName;
    #age;
    #weight;
    #size;

    // On défini nos méthodes
    constructor(firstName, lastName, age, weight, size = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.weight = weight;
        this.size = size;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(firstname) {
        if (typeof firstname !== "string") {
            throw Error("Le prénom doit être une chaine de caractères");
        }

        this.#firstName = firstname;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(lastname) {
        if (typeof lastname !== "string") {
            throw Error("Le nom doit être une chaine de caractères");
        }

        this.#lastName = lastname;
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        if (isNaN(age)) {
            throw Error("L'age doit être un nombre");
        }

        this.#age = age;
    }

    get weight() {
        return this.#weight;
    }

    set weight(weight) {
        if (isNaN(weight)) {
            throw Error("Le poids doit être un nombre");
        }

        this.#weight = weight;
    }

    get size() {
        return this.#size;
    }

    set size(size) {
        if (isNaN(size)) {
            throw Error("La taille doit être un nombre");
        }

        this.#size = size;
    }

    sayHello() {
        let sentence = `Bonjour. Je m'appelle ${this.#firstName} ${this.#lastName}, j'ai ${this.#age} ans, je pèse ${this.#weight} kg`;
        if (this.#size) {
            sentence += ` et je mesure ${this.#size} cm`
        }
        sentence += '.';

        console.log(sentence);
    }
}

const paul = new Person("Paul", "Dupont", 31, 82, 175);
// Une fois en private, les 2 lignes suivantes ne servent plus à rien, elles ne modifient pas les propriétés de l'objet
paul.firstName = "Polo";
// paul.age = "toto"; // Ca, ça n'a aucun sens. Si quelque part on fait age * 2, ça va péter...

// C'est l'anniv de Paul
// paul.age += 1;
console.log(paul.age);
paul.age += 1;
// paul.age = 31 + 1;
// paul.age = 32;

console.log(paul);
paul.sayHello();

const maurice = new Person("Maurice", "Durand", 55, 110, 192);
console.log(maurice);
maurice.sayHello();

const renaud = new Person("Renaud", "Charpentier", 32, 95);
console.log(renaud);
renaud.sayHello();