require('dotenv').config()

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const {v4:uuidv4} = require('uuid');
const {ExpressPeerServer} = require('peer')
const peer = ExpressPeerServer(server , {
  debug:true
});


app.use('/peerjs', peer);
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))
const router = require('./routes/routes')
const PORT = process.env.PORT
app.use(router)

app.get('/' , (req,res)=>{
    res.redirect(`/${uuidv4()}`);
  });


  io.on("connection" , (socket)=>{
    socket.on('newUser' , (id , room)=>{
      socket.join(room);
      socket.to(room).broadcast.emit('userJoined' , id);
      socket.on('disconnect' , ()=>{
          socket.to(room).broadcast.emit('userDisconnect' , id);
      })
    })
  })
server.listen(PORT , (req , res) => {
    console.log('Server started on PORT 3000')
})