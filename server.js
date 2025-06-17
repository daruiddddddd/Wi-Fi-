
const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, port: 3001 });

app.use(express.static('.'));

wss.on('connection', function connection(ws) {
    ws.on('message', function () {
        const dummyData = 'x'.repeat(1024 * 100); // 100KB
        ws.send(dummyData);
    });
});

server.listen(3000, () => {
    console.log('Web server running on port 3000');
});
