const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });

app.use(express.static('.'));

wss.on('connection', function connection(ws) {
  ws.on('message', function () {
    const dummyData = 'x'.repeat(1024 * 100); // 100KB
    ws.send(dummyData);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
