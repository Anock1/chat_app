const  express =require('express');
const app = express();
const port = process.env.PORT || 5000;
const socket =require('socket.io');

// static files
app.use(express.static('public'))


const server = app.listen(port,()=>{
//console.log(`🔥 server running on port:${port}`) 
});

const io = socket(server,{});
io.on('connection',(socket)=>{
   // console.log(`🔥User:${socket.id} joined the chat`)

    socket.on('chat',(payload)=>{
        console.log('what is payload:', payload);
        io.sockets.emit('chat',payload)
        })

      socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
      })
    socket.on('disconnect',()=>{
    //console.log(`🔥User:${socket.id} left`)
    })

})
