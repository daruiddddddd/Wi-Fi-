let chart;
const ctx = document.getElementById('speedChart').getContext('2d');

const dataTop = {
  labels: ['フレッツ光', 'auひかり', 'ソフトバンク光', 'NURO光', 'ドコモ光'],
  download: [420, 390, 370, 440, 400],
  upload: [220, 200, 190, 230, 210],
  ping: [14, 17, 20, 13, 16]
};

const dataBottom = {
  labels: ['楽天ひかり', 'OCN光', 'ぷらら光', 'So-net光', 'ビッグローブ光'],
  download: [120, 140, 110, 130, 125],
  upload: [80, 85, 75, 82, 79],
  ping: [40, 45, 50, 43, 47]
};

function drawChart(dataSet) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataSet.labels,
      datasets: [
        { label: '下り(Mbps)', data: dataSet.download, borderColor: 'blue', fill: false },
        { label: '上り(Mbps)', data: dataSet.upload, borderColor: 'red', fill: false },
        { label: 'Ping(ms)', data: dataSet.ping, borderColor: 'orange', fill: false }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function switchTab(type) {
  if (type === 'top') drawChart(dataTop);
  else drawChart(dataBottom);
}

async function runSpeedTest() {
  try {
    const res = await fetch('/api/speed');
    const data = await res.json();
    document.getElementById('download').textContent = data.download + ' Mbps';
    document.getElementById('upload').textContent = data.upload + ' Mbps';
    document.getElementById('ping').textContent = data.ping + ' ms';
  } catch (err) {
    alert("速度テストに失敗しました: " + err.message);
  }
}