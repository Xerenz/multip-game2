/**
 * Contains Utility functions which will be usefull 
 * in both client side and server side
 * Using ES5 syntax so its acceptable in node too
 */

function Util() {
    throw new Error('Util cannot be instantiated')
}

/**
 * Binds the object with more convenient property names
 * @param {Object} object "this" object
 * @param {Array<string>} propertyNames the names of properties which need to be bound with the object
 * @param {string} propertyForm the original name of the properties
 */
Util.splitProperties = function(object, propertyNames, propertyForm) {
    for (let i=0; i <= propertyNames.length; i++) {
        (function(j) {
            Object.defineProperties(object, propertyNames[j], {
                enumerable : true,
                configurable : true,
                get : function() {
                    return object[propertyForm][j]
                },
                set : function(value) {
                    object[propertyForm][j] = value
                }
            })
        })(i)
    }
}

/**
 * Allows for ES5 class inheritance by implementing functionality for a
 * child class to inherit from a parent class.
 * @param {Object} child The child object that inherits the parent
 * @param {Object} parent The parent object to inherit from
 */
Util.extend = function(child, parent) {
    child.prototype = Object.create(parent)
    child.prototype.parent = parent.prototype
}

/**
 * Reduces the array to sum of its values
 * @param {Array<number>} array 
 */
Util.sum = function(array) {
    return array.reduce((total, value) => total + value)
}

/**
 * Get the square value of Euclidean distance between 2 vectors
 * @param {Array<number>} vector1 
 * @param {Array<number>} vector2 
 */
Util.getEuclideanDistance2 = function(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error('Array values of unequal dimensions, cannot perform function')
    }
    return Util.sum(vector2.map((value, index) => Math.abs(value - vector2[index])))
}

/**
 * Get the Euclidean distance between 2 vectors
 * @param {Array<number>} vector1 
 * @param {Array<number>} vector2  
 */
Util.getEuclideanDistance = function(vector1, vector2) {
    if (vector1.length !== vector2.length) {
        throw new Error('Array values of unequal dimensions, cannot perform function')
    }
    return Math.sqrt(Util.getEuclideanDistance2(vector1, vector2))
}

module.exports = Util