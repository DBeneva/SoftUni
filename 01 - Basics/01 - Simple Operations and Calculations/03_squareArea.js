function getSquareArea(a) {
    return a * a;
}

function getSquareAreaExp(a) {
    return a ** 2;
}

function getSquareAreaPow(a) {
    return Math.pow(a, 2);
}

console.log(getSquareArea(5));

console.log('====================');

console.log(getSquareAreaExp(5));

console.log('====================');

console.log(getSquareAreaPow(5));