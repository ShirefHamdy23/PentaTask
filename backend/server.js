const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db/database');
const apiRoutes = require('./routes/api');
const { startAnalyticsBroadcastLoop } = require('./utils/analyticsService');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

app.set('broadcast', broadcast);

startAnalyticsBroadcastLoop(app);

// Start the server
server.listen(4000, () => {
  console.log('🚀 Server running on http://localhost:4000');
});
