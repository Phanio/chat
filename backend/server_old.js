const server = require('http').createServer();
const io = require('socket.io')(server);
const uuid = require('uuid');
const clients = new Map();

io.on('connection', client => {
  clients.set(client.id, client);
  console.log(`Client with ${client.id} is connected`);
  client.emit('clientList', 'cool', clients.size);
  console.log('size', clients.size);

  client.on('event', receivedMsg => {
    console.log(
      `Client with id: ${client.id} send the following data to the server: ${receivedMsg}`
    );

    for (const client of clients.values()) {
      const msg = {
        id: uuid.v4(),
        author: receivedMsg.author,
        value: receivedMsg.value,
        clients: clients.values.length
      };
      client.emit('event', msg);
    }
  });
  client.on('disconnect', () => {
    clients.delete(client.id);
  });
});

server.listen(3000, () => {
  console.log('server connected');
});
