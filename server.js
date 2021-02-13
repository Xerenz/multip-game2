// GLOBAL VARIABLES
const PORT = process.env.PORT || 8000
const FPS = 60

// imports
const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

// Static files handler
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use('/public', express.static(__dirname + '/public'))
app.use('/shared', express.static(__dirname + '/shared'))

// Send html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// Sockets 
io.on('connection', (socket) => {
    socket.on('player-join', () => {
        console.log('New player has joined the game')
    })
    socket.on('player-action', (data) => {
        console.log('Player needs to be updated')
    })
    socket.on('disconnect', () => {
        console.log('Player disconnected')
    })
})

// Server listening
server.listen(PORT, () => console.log(`Listening to port ${PORT}`))