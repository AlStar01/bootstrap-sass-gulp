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
 * 
 * @example
 * 
 * var p1 = {
 *  name: "John Smith";
 *  position: "Quarterback",
 *  salary: 1000000
 * }
*/

var player = {
    name: "John Smith",
    salary: "100,000",
    /**
     * Print to string
     * @return {string} combination of name and salary
    */
    toString: function(){
        return this.name + " " + this.salary;
    }
};


/** Class representing a point. */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        // ...
    }

    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        // ...
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        // ...
    }
}


/**
 * Class representing a dot.
 * @extends Point
 */
class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
        // ...
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
        // ...
    }
}


/**
 * A module that says hello!
 * @module hello/world
 */

/** Say hello. */
exports.sayHello = function() {
    return 'Hello world';
};