// un premier objet...
const paul = {
    //... avec des propriétés...
    firstName: "Paul",
    lastName: "Dupont",
    age: 31,

    //... et une méthode
    sayHello: function () {
        console.log(
            `Bonjour. Je m'appelle ${paul.firstName} ${paul.lastName} et j'ai ${paul.age} ans.`
        );
    },
};

// ok, ça marche, impeccable.
paul.sayHello();

// et maintenant, un deuxième !
const maurice = {
    firstName: "Maurice",
    lastName: "Durand",
    age: 52,
};

// ha flute, ça marche pas...
// comment passer la méthode à maurice ?
maurice.sayHello();
