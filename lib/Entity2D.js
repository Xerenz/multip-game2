// Entity object dimensions is 2D
const DIMENSIONS = 2    

const Util = require('../shared/Util.js')

/**
 * Constructor for all 2D shapes
 * @param {Array<number>} position (x, y) of the Entity
 * @param {Array<number>} velocity (vx, vy) of the Entity
 * @param {Array<number>} acceleration (ax, ay) of the Entity
 * @param {Number} mass of the Entity
 * @param {Number} orientation of the Entity
 * @param {Number} hitbox of the Entity
 */
function Entity2D(position, velocity, acceleration, 
    mass, orientation, hitbox) {
        this.position = position || [0, 0]
        this.velocity = velocity || [0, 0]
        this.acceleration = acceleration || [0, 0]
        this.mass = mass || 1
        this.orientation = orientation
        this.hitbox = hitbox || 0

        // time variables to handle proper updates
        this.deltaTime = 0
        this.lastUpdateTime = 0

        Util.splitProperties(this, ['x', 'y'], 'position')
        Util.splitProperties(this, ['vx', 'vy'], 'velocity')
        Util.splitProperties(this, ['ax', 'ay'], 'acceleration')
}

/**
 * The force object contains an array for fx, fy
 * @param {Array<number>} force applied on the entity
 */
Entity2D.prototype.applyForce = function(force) {
    for (let i=0; i <= DIMENSIONS; i++) {
        this.acceleration[i] += force / this.mass
    }
}

/**
 * Check if collision between 2 entities happen
 * @param {Object} other the another game entity with 
 * which self may interact in some way
 * @returns boolean
 */
Entity2D.prototype.isCollideWith = function(other) {
    let distanceBetween = Util.getEuclideanDistance2(this.position, other.position)
    let minDistance = self.hitbox + other.hitbox
    return distanceBetween <= (minDistance * minDistance)
}

/**
 * Update the position, velocity and acceleration of the Entity
 * @param {number} deltaTime is the time interval in observation
 */
Entity2D.prototype.update = function(deltaTime) {
    let currentTime = (new Date()).getTime()
    if (deltaTime) {
        this.deltaTime = deltaTime
    }
    else if (this.lastUpdateTime === 0) {
        this.deltaTime = 0
    }
    else {
        this.deltaTime = (currentTime - this.lastUpdateTime) / 1000 // nearest second
    }

    // update all values accordingly
    for (let i=0; i <= DIMENSIONS; i++) {
        this.position[i] += this.velocity[i] * deltaTime
        this.velocity[i] += this.acceleration[i] * deltaTime
        this.acceleration[i] = 0 // there is probably some acceleration
        // in that time difference because some force was applied
        // after that time interval, acceleation is again set to 0
    }
}

module.exports = Entity2D