const ws = new WebSocket('ws://'+location.host+'/ws');
ws.onmessage = e => console.log(e.data);

function showTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id==='dashboard') fetch('/status').then(r=>r.json()).then(j=>{
        document.getElementById('content').innerHTML = 
        `<div class="tab active" id="dashboard">
            <p>Battery: ${j.battery}%</p>
            <p>Volume: ${j.volume}</p>
            <p>Playing: ${j.playing}</p>
        </div>`;
    });
    else if (id==='logs') fetch('/logs').then(r=>r.text()).then(t=>{
        document.getElementById('content').innerHTML = `<pre class="tab active" id="logs">${t}</pre>`;
    });
    else document.getElementById('content').innerHTML = `<div class="tab active" id="${id}">Coming soon</div>`;
}
window.onload = () => showTab('dashboard');