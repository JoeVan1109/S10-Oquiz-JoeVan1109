// la Factory
const PersonFactory = {
    // une méthode pour créer des personnes
    makePerson: (firstName, lastName, age, weight, size = null) => {
        // on crée un objet vide...
        let newPerson = {};
        // ... on lui ajoute des propriétés...
        newPerson.firstName = firstName;
        newPerson.lastName = lastName;
        newPerson.age = age;
        newPerson.weight = weight;
        newPerson.size = size;

        let sentence = `Bonjour. Je m'appelle ${newPerson.firstName} ${newPerson.lastName}, j'ai ${newPerson.age} ans, je pèse ${newPerson.weight} kg`;
        if (newPerson.size) {
            sentence += ` et je mesure ${newPerson.size} cm`
        }
        sentence += '.';

        // ... puis une méthode
        newPerson.sayHello = () => {
            // ici on peut utiliser "newPerson" !
            // chaque appel à la factory aura son propre contexte.
            console.log(sentence);
        };

        // et enfin, on le retourne !
        return newPerson;
    },
};

// et c'est parti, on fait tourner la fabrique.
const paul = PersonFactory.makePerson("Paul", "Dupont", 31, 82, 175);
const maurice = PersonFactory.makePerson("Maurice", "Durand", 55, 110, 192);
const renaud = PersonFactory.makePerson("Renaud", "Charpentier", 32, 95);

// tada ! ça fonctionne nickel.
paul.sayHello();
maurice.sayHello();
renaud.sayHello();

console.log(paul);
console.log(maurice);
console.log(renaud);
