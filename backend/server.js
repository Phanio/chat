const app = require('express')();

const http = require('http').Server(app);
const uuid = require('uuid');
const io = require('socket.io')(http);
app.get('/login', (req, res) => {
  console.log('login');
});
const clients = new Map();

io.on('connection', (client) => {
  io.emit('noOfConnections', Object.keys(io.sockets.connected).length);

  client.on('disconnect', () => {
    console.log('disconnected');
    clients.delete(client.id);
    const list = [];
    for (var valeur of clients.values()) {
      console.log(valeur);
      list.push(valeur);
    }
    io.emit('disconnect', list);
  });

  client.on('chatmessage', (msg) => {
    const mg = {id: uuid.v4(),...msg}
    io.emit('chatmessage', mg);
  });
  client.on('joined', (name) => {
    clients.set(client.id, { id: client.id, idb: uuid.v4(), name });
    const list = [];
    for (var valeur of clients.values()) {
      console.log(valeur);
      list.push(valeur);
    }
    console.log('list2===',list);
    io.emit('joined', list);
  });
  client.on('leaved', (name) => {
    clients.delete(client.id);
    const list = [];
    for (var valeur of clients.values()) {
      console.log(valeur);
      list.push(valeur);
    }
    console.log('leave==', name);
    io.emit('leaved', list);
  });

  client.on('typing', (data) => {
    client.broadcast.emit('typing', data);
  });
  client.on('stoptyping', () => {
    client.broadcast.emit('stoptyping');
  });
});

http.listen(3000, () => {
  console.log('Server is started at http://localhost:3000');
})
;
