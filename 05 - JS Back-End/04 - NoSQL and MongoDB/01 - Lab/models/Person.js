const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: 122
    }
});

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
});

personSchema.methods.sayHi = function () { // NOT an arrow function
    console.log(`My name is ${this.firstName} and I am ${this.age} years old.`);
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;