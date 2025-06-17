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
