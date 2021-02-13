import Drawing from './Drawing.js'
import Input from './Input.js'

export default class Game {
    /**
     * Game class constructor
     * Initializing context and drawing object
     * Client side players - a "self" and "others"
     * @param {Object} socket responsible for client side socket connection 
     * @param {Element} canvas html attribute
     */
    constructor(socket, canvas) {
        this.socket = socket
        this.canvas = canvas
        const context = canvas.getContext('2d')
        this.drawing = new Drawing(context)

        // client side variables for the game
        this.self = null
        this.others = []
        this.animationFramId = 0
    }

    /**
     * Initialize Game in the client side
     * New player is created and connection established with the server
     * Check for any updates and receive data from server
     */
    init() {
        this.socket.on('update', (data) => {
            this.receiveGameState(data)
        })
        this.socket.emit('player-join')
    }

    draw() {
        this.drawing.clear()

        this.drawing.drawSelf(
            this.self.x,
            this.self.y,
            this.self.hitbox
        )

        for (let player in this.others) {
            this.drawing.drawOther(
                player.x,
                player.y,
                player.hitbox
            )
        }
    }

    update() {
        if (this.self) {
            this.socket.emit('player-action', {
                keyboard : {
                    
                }
            })
            this.draw()
        }
        this.animate()
    }

    animate() {
        this.animationFramId = window.requestAnimationFrame(
            this.update
        )
    }

    cancelAnimation() {
        window.cancelAnimationFrame(this.animationFramId)
    }

    /**
     * Update all players according to info from the client
     * @param {Object} state is the game state received from the server
     */
    receiveGameState(state) {
        this.self = state['self']
        this.others = state['others']
    }

    /**
     * Set the canvas according to users preference
     * @param {number} height 
     * @param {number} width 
     * @param {string} border 
     * @param {string} backgroundColor 
     */
    setCanvas(height=600, width=800, border='1px solid black', backgroundColor='#f7f7f7') {
        this.canvas.height = height
        this.canvas.width = width
        this.canvas.style.border = border
        this.canvas.style.backgroundColor = backgroundColor
    }
}