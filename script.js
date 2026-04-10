// script.js

// Function to fetch data from Google Sheets
async function fetchData() {
    const sheetID = '1YNTRBLTzp1znjqt8XW2xP9mUTJr22NffIbJv03TqGTE';
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv`;

    try {
        const response = await fetch(url);
        const data = await response.text();
        parseCSV(data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// Function to parse CSV data and populate the table
function parseCSV(data) {
    const lines = data.split('\n');
    const table = document.getElementById('data-table');
    table.innerHTML = ''; // Clear existing table data

    lines.forEach((line, index) => {
        const row = document.createElement('tr');
        const cells = line.split(',');

        cells.forEach(cell => {
            const cellElement = document.createElement('td');
            cellElement.textContent = cell;
            row.appendChild(cellElement);
        });

        table.appendChild(row);
    });
}

// Fetch data when the page loads
window.onload = () => {
    fetchData();
    setInterval(fetchData, 30000); // Refresh data every 30 seconds
};