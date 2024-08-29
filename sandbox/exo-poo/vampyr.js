/*
Coder la classe Vampyr, qui hérite de Person
- constructor(firstName, lastName, age) // mais state = "mort-vivant" !
*/

/*
On a vu que les propriétés pouvaient être public ou private, static ou non.
C'est le cas aussi pour les méthodes, avec globalement les mêmes avantages / contraintes...
*/

const Person = require('./person');

class Vampyr extends Person {
    static nbVampyrs = 0;

    constructor(firstName, lastName, age) {
        // Comme pour toutes les personnes, je défini le prénom, le nom et l'age.
        super(firstName, lastName, age);

        // Puis contrairement aux autres personnes, je suis mort-vivant, j'utilise donc le setter de state pour mettre ça à jour.
        this.state = "mort-vivant";

        // Dés qu'un Vampyr "nait" (quand il est transformé), le nombre de vampires sur terre augmente de 1.
        // Ce nombre ne concerne pas un seul individu Vampire, mais bien l'ensemble de la communauté Vampire.
        // Du coup, pas de this pour les propriétés statiques, mais directement le nom de la classe.
        Vampyr.nbVampyrs++;
    }

    reportCommunity() {
        console.log(`Les vampires domineront bientôt le monde, nous sommes déjà ${Vampyr.nbVampyrs}.`);
    }
}

const pattinson = new Vampyr('Edward', 'Cullen', 117);
const alucard = new Vampyr('Alucard', 'Salvatores', 300);
const vlad = new Vampyr('Vlad', 'Dracula', 200);
vlad.sayHello();
vlad.reportCommunity();
pattinson.reportCommunity();
alucard.reportCommunity();

module.exports = Vampyr;