function getPersonInfo(firstName, lastName, age, town) {
    return `You are ${firstName} ${lastName}, a ${age}-years old person from ${town}.`;
}

console.log(getPersonInfo('John', 'Smith', '35', 'London'));