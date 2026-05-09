// Check if user is logged in (unless they are on login or error page)
function checkAuth() {
    const isAuthPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('error.html') || window.location.pathname === '/';
    const user = sessionStorage.getItem('tcUser');

    if (!user && !isAuthPage) {
        window.location.href = 'index.html';
    }
    
    // Set username in header if it exists
    if (user && document.getElementById('username-display')) {
        document.getElementById('username-display').innerText = user;
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === tcData.validCredentials.username && pass === tcData.validCredentials.password) {
        sessionStorage.setItem('tcUser', user);
        window.location.href = 'location.html';
    } else {
        window.location.href = 'error.html';
    }
}

// Handle Logout
function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Populate Locations on Page 2
function populateLocations() {
    const select = document.getElementById('location-select');
    if (select) {
        tcData.locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc;
            option.textContent = loc;
            select.appendChild(option);
        });
    }
}

// Populate Dashboard Table
function populateTable() {
    const tableBody = document.getElementById('shipment-data');
    if (tableBody) {
        tcData.shipments.filter(s => s.status === 'Delivered').forEach(shipment => {
            const row = `<tr><td>${shipment.id}</td><td>${shipment.weight}</td></tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Run functions on page load
window.onload = () => {
    checkAuth();
    populateLocations();
    populateTable();
};
