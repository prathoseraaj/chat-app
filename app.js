const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`💬 Server on port ${PORT}`))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

//to create the set of socketid
let connectedids = new Set()

io.on('connection', onConnect)

function onConnect(socket) {
    console.log(socket.id) // socket id { AND if we open in another brower tab, it produce another serverid} 
    connectedids.add(socket.id)
    //console.log(connectedids); {To check}


    io.emit('client-total', connectedids.size)

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id)
        connectedids.delete(socket.id);
        io.emit('client-total', connectedids.size)

    })
}
