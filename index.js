const express = require('express');
const app = express();
const httpServe = require('http').createServer(app);

const io = require('socket.io')(httpServe);

const path = require('path');


httpServe.listen(3000,()=>{
  console.log('Listen on port *:3000');
})

app.use(express.static(path.join(__dirname,'public')));


//chat room
let numberUsers = 0;

io.on('connection', (socket)=>{
  let addedUser  = false;

  socket.on('new message', (msg) => {
    console.log('messa', msg);
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: msg
    })
  });

  socket.on('add user', (username) => {
    if (addedUser)return;

    socket.username = username;
    ++numberUsers;
    addedUser = true;
    console.log('username ', username);
    socket.emit('login', {numberUsers: numberUsers});

    socket.broadcast.emit('user joined', {
      username:socket.username
    });
  });
})





