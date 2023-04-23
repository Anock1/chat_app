
const express = require('express');
const PORT = process.env.PORT || 5000;
const http =require('http');
const Server = require('socket.io').Server;
const app = express();


const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:["GET","POST"],
        allowedHeaders:['my-header'],
        credentials:true
    }
})

io.on('connection',(socket)=>{
    console.log(`🔥User:${socket.id} joined the chat`)

    socket.on('chat',(payload)=>{
        console.log('what is payload:', payload);
        io.sockets.emit('chat',payload)
        })

      socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
      })
    socket.on('disconnect',()=>{
     console.log(`🔥User:${socket.id} left`)
    })

})


server.listen(PORT,()=>{
  console.log(`server running on http://localhost:${PORT}`)
})
