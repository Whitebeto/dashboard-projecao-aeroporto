const SHEET_ID = '17nTgtnPGyKNKNXggPwKASwYIp8aD8BM__KNhY5jscdg';
const GID = '1632616135';

async function fetchData() {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;
    try {
        const response = await fetch(url);
        const data = await response.text();
        const parsed = parseCSV(data);
        renderTable(parsed);
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('data-body').innerHTML = '<tr><td colspan="7">❌ Erro ao carregar</td></tr>';
    }
}

function parseCSV(csv) {
    const lines = csv.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(',');
        const row = {};
        headers.forEach((h, idx) => {
            row[h] = cells[idx] ? cells[idx].trim() : '';
        });
        data.push(row);
    }
    return data;
}

function renderTable(data) {
    const tbody = document.getElementById('data-body');
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.cutoff || '-'}</td><td>${row.hora || '-'}</td><td>${row.tipo || '-'}</td><td>${row.shipment || '0'}</td><td>${row.transbordo || '0'}</td><td>${row.canal || '-'}</td><td>${row.dia_semana || '-'}</td>`;
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', fetchData);
setInterval(fetchData, 30000);