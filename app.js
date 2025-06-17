let chart;
const ctx = document.getElementById('speedChart').getContext('2d');
const testBtn = document.getElementById('testBtn');
const groupLabel = document.getElementById('groupLabel');
const recommendDiv = document.getElementById('recommend');
const providersDiv = document.getElementById('providers');

const dataTop = {
  labels: ['会社A', '会社B', '会社C', '会社D', '会社E'],
  download: [340.84, 310.81, 340.84, 340.84, 340.84],
  upload: [367.00, 363.07, 367.00, 367.00, 367.00],
  ping: [1.56, 1.66, 1.66, 1.66, 1.66]
};

const dataBottom = {
  labels: ['会社F', '会社G', '会社H', '会社I', '会社J'],
  download: [140.2, 132.5, 128.8, 120.0, 118.5],
  upload: [90.2, 85.7, 83.3, 79.0, 78.5],
  ping: [45.0, 48.0, 50.5, 52.0, 53.5]
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

function showProviders(dataSet) {
  providersDiv.innerHTML = "";
  for (let i = 0; i < dataSet.labels.length; i++) {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.display = "inline-block";
    div.style.margin = "4px";
    div.style.padding = "6px";
    div.innerHTML = `<strong>${dataSet.labels[i]}</strong><br>
      ↓下り: ${dataSet.download[i]} Mbps<br>
      ↑上り: ${dataSet.upload[i]} Mbps<br>
      🕒Ping: ${dataSet.ping[i]} ms`;
    providersDiv.appendChild(div);
  }
}

function findRecommended(dataSet) {
  const scores = dataSet.download.map((d, i) => d - dataSet.ping[i] * 2);
  const maxIndex = scores.indexOf(Math.max(...scores));
  recommendDiv.textContent = `今の時間帯のおすすめは ${dataSet.labels[maxIndex]} です`;
}

function switchTab(type) {
  if (type === 'top') {
    drawChart(dataTop);
    showProviders(dataTop);
    findRecommended(dataTop);
    groupLabel.textContent = "表示中：上位5社";
  } else {
    drawChart(dataBottom);
    showProviders(dataBottom);
    findRecommended(dataBottom);
    groupLabel.textContent = "表示中：下位5社";
  }
}

async function runSpeedTest() {
  testBtn.disabled = true;
  try {
    const res = await fetch('/api/speed');
    const data = await res.json();
    document.getElementById('download').textContent = data.download + ' Mbps';
    document.getElementById('upload').textContent = data.upload + ' Mbps';
    document.getElementById('ping').textContent = data.ping + ' ms';
  } catch (err) {
    alert("速度テストに失敗しました: " + err.message);
  }
  testBtn.disabled = false;
}