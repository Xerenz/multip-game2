export default class Drawing {
    /**
     * 
     * @param {Object} context from the canvas to draw objects
     */
    constructor(context) {
        this.context = context
    }

    /**
     * Clear screen
     */
    clear() {
        const canvas = this.context.canvas
        canvas.clearRect(0, 0, canvas.width, canvas.height)
    }
   
    /**
     * Insert an image into the canvas
     * @param {string} src 
     * @param {number} width 
     * @param {number} height 
     */
    createImage(src, width, height) {
        const img = Image(width, height)
        img.src = src
        return img
    }

    /**
     * Draw boundary for self
     * fill color green
     * @param {Number} x coordinate of the player
     * @param {Number} y coordinate of the player
     * @param {Number} size of the player
     */
    drawSelf(x, y, size) {
        this.context.save()
        this.context.beginPath()
        this.context.fillStyle = 'green'
        this.context.arc(x, y, size, 0, 2*Math.PI)
        this.context.fill()
        this.context.restore()
    }

    /**
     * Draw boundary for others
     * fill color red
     * @param {Number} x coordinate of the player
     * @param {Number} y coordinate of the player
     * @param {Number} size of the player
     */
    drawOther(x, y, size) {
        this.context.save()
        this.context.beginPath()
        this.context.fillStyle = 'red'
        this.context.arc(x, y, size, 0, 2*Math.PI)
        this.context.fill()
        this.context.restore()
    }
}