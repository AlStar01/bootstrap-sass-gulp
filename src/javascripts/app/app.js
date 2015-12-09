/** 
 * @global
 * @description It's the global foo variable, use it all over
 * */
var foo = "Hello World";

/**
 * Function to add two numbers
 * 
 * @function add
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
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * 
 * @returns {number} Sum of a and b
*/
function add(a,b){
    return a + b;
}

/**
 * Function to determine if number is even
 * 
 * @function isEven
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
 * @param {number} a - The number you want to check
 * 
 * @returns {boolean} Boolean indicating whether value is even
*/
function isEven(a){
    return a % 2 === 0;
}

/**
 * @namespace player
 * @property {object} player          - The player object
 * @property {string} player.name     - The name of the player
 * @property {string} player.position - The player's position
 * @property {number} player.salary   - The salary of the player
*/

var player = {
    name: "John Smith",
    salary: "100,000"
};