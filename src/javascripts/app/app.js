var foo = "Hello World";

/**
 * Function to add two numbers
 * @function 
 * 
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * 
 * @returns {number} Sum of a and b
 * 
 * @example
 * 
 * var a = 1;
 * var b = 2;
 * 
 * var sum = add(1, 2);
 * 
 * console.log(sum);
 * 
*/
function add(a,b){
    return a + b;
}

/**
 * Function to determine if number is even
 * @function 
 * 
 * @param {number} a - The number you want to check
 * 
 * @returns {boolean} Boolean indicating whether value is even
 * 
 * @example
 * 
 * var a = 1;
 * var b = 2;
 * 
 * var sum = add(1, 2);
 * 
 * console.log(sum);
*/
function isEven(a){
    return a % 2 === 0;
}