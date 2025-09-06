

window.onload = async function () {
    if (window.location.pathname.includes('results.html')) {
      const input = localStorage.getItem('user_input');
  
      const res = await fetch('http://127.0.0.1:5000/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input })
      });
  
      const data = await res.json();
      if (!data || !data.rides) {
        alert("Could not get ride data");
        return;
      }
  
      showModal(data);
    }
  };
  
  function showModal(data) {
    const container = document.getElementById('ride-options');
    container.innerHTML = `<p>From <b>${data.origin}</b> to <b>${data.destination}</b></p><ul>`;
    data.rides.forEach(ride => {
      let color = ride.price < 300 ? 'green' : ride.price < 350 ? 'orange' : 'red';
      container.innerHTML += `
        <li><span class="legend-box ${color}"></span>
        ${ride.service}: <b>${ride.price} ETB</b> (${ride.eta})</li>`;
    });
    container.innerHTML += '</ul>';
    document.getElementById('modal').style.display = 'flex';
  }
  
  function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    document.getElementById('legend').style.display = 'block';
    loadMap();
  }
  
  function loadMap() {
    const map = L.map('map').setView([9.03, 38.74], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([9.04, 38.75]).addTo(map).bindPopup("📍 Origin: Piassa");
    L.marker([9.01, 38.76]).addTo(map).bindPopup("🏁 Destination: Bole");
  
  }
  
