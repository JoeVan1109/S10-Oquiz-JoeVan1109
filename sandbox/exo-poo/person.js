/*
Coder la classe Person
- propriétés: firstName, lastName, age, state
- constructor(name, age) // state = "vivant" par défaut
- méthode toString() et sayHello()
*/

class Person {
    #firstName;
    #lastName;
    #age;
    #state = "vivant";

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        this.#age = age;
    }

    get state() {
        return this.#state;
    }

    set state(state) {
        this.#state = state;
    }

    toString() {
        return `Je m'appelle ${this.firstName} ${this.lastName}, j'ai ${this.age} ans, et je suis ${this.state}.`;
    }

    sayHello() {
        console.log(this.toString());
    }
}

// const louis = new Person('Louis', 'Delarue', 20);
// louis.sayHello();

module.exports = Person;