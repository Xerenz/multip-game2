/**
 * The Player entity which participates in the game
 * It is an extension of Entity2D
 */

const Entity2D = require('./Entity2D.js')
const Util = require('../shared/Util.js')

function Player(id) {
    Entity2D.call(this, [10, 10], null, null, null, null, Player.HITBOX)
    this.id = id
}

Util.extend(Player, Entity2D)

Player.HITBOX = 10

Player.create = function(id) {
    return new Player(id)
}

/**
 * Updates state with receiving keyboard input
 * @param {Object} keyboardSate received from player
 */
Player.prototype.updateOnInput = function(keyboardSate) {
    this.vy = 100 * (Number(keyboardSate.down) - Number(keyboardSate.up))
    this.vx = 100 * (Number(keyboardSate.right) - Number(keyboardSate.left))
}

/**
 * Steps the Player forward in time and updates the internal position, velocity,
 * etc.
 */
Player.prototype.update = function() {
    this.parent.update.call(this)
}

module.exports = Player