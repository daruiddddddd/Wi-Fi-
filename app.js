
let chart;
const ctx = document.getElementById('speedChart').getContext('2d');

function drawChart(data) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['フレッツ光', 'auひかり', 'ソフトバンク光', 'NURO光', 'ドコモ光'],
            datasets: [
                { label: '下り(Mbps)', data: data.download, borderColor: 'blue', fill: false },
                { label: '上り(Mbps)', data: data.upload, borderColor: 'red', fill: false },
                { label: 'Ping(ms)', data: data.ping, borderColor: 'orange', fill: false }
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
    if (type === 'top') {
        drawChart({ download: [400, 350, 320, 420, 360], upload: [200, 180, 170, 220, 190], ping: [15, 18, 20, 12, 17] });
    } else {
        drawChart({ download: [120, 150, 100, 130, 140], upload: [80, 90, 70, 85, 75], ping: [40, 45, 50, 42, 47] });
    }
}

function startTest() {
    const socket = new WebSocket('ws://' + window.location.hostname + ':3001');
    const result = document.getElementById('result');
    let startTime, endTime;
    socket.onopen = () => {
        startTime = Date.now();
        socket.send("test");
    };
    socket.onmessage = (event) => {
        endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const speed = (event.data.length / 1024 / duration).toFixed(2);
        result.innerText = `下り速度: ${speed} KB/s, 応答時間: ${duration * 1000} ms`;
        socket.close();
    };
}
