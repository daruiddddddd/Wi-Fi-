const express = require('express');
const http = require('http');
const path = require('path');
const speedTest = require('speedtest-net');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname)));

app.get('/api/speed', async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true, signal: AbortSignal.timeout(20000) });
    res.json({
      download: (result.download.bandwidth * 8 / 1e6).toFixed(2),
      upload: (result.upload.bandwidth * 8 / 1e6).toFixed(2),
      ping: result.ping.latency
    });
  } catch (err) {
    res.status(500).json({ error: "Speedtest failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});