import Game from './game/Game.js'

// should be pre written code
const canvas = document.getElementById("canvas")
const socket = io()

const game = new Game(socket, canvas)
game.init()

// should be added via game engine dashboard
game.setCanvas()