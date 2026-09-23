export function renderHistorialRutas(container) {
    container.innerHTML = `
        <div class="historial-main-container" style="padding: 20px;">
            <div class="historial-header" style="margin-bottom: 20px;">
                <h2>Rutas realizadas</h2>
                <p style="color: #666;">Consulta el historial de tus viajes y recorridos completados.</p>
            </div>

            <div class="historial-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <!-- Sección de la lista de rutas -->
                <div class="routes-list-section" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="margin-bottom: 15px;">Tus Viajes Recientes</h3>
                    <div id="listaHistorial" style="display: flex; flex-direction: column; gap: 10px;">
                        <p>Cargando viajes desde la base de datos...</p>
                    </div>
                </div>

                <!-- Sección del Mapa -->
                <div class="route-map-section" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="margin-bottom: 15px;">Detalle del viaje en el Mapa</h3>
                    <div id="mapaHistorial" style="width: 100%; height: 320px; border-radius: 6px; z-index: 1;"></div>
                </div>
            </div>
        </div>
    `;

    // 1. Inicializar Mapa
    setTimeout(() => {
        const mapaDiv = document.getElementById('mapaHistorial');
        if (mapaDiv) {
            const map = L.map('mapaHistorial').setView([6.25184, -75.56359], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // 2. Consumir el Backend
            const correoUsuario = localStorage.getItem('correoUsuario');
            const listaHistorialDiv = document.getElementById('listaHistorial');

            if (correoUsuario) {
                fetch(`http://localhost:8080/api/rutas/historial?correo=${correoUsuario}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length === 0) {
                            listaHistorialDiv.innerHTML = `<p>No tienes rutas registradas todavía.</p>`;
                            return;
                        }

                        listaHistorialDiv.innerHTML = '';
                        data.forEach(item => {
                            const routeCard = document.createElement('div');
                            routeCard.className = 'route-item-card';
                            routeCard.style.cssText = 'padding: 12px; border: 1px solid #eaeaea; border-radius: 6px; cursor: pointer; transition: background 0.2s;';
                            routeCard.innerHTML = `
                                <strong style="color: #333;">${item.ruta.origen} → ${item.ruta.destino}</strong>
                                <p style="margin: 5px 0 0; font-size: 13px; color: #666;">🕒 ${item.ruta.tiempoEstimado} &nbsp;|&nbsp; 📅 ${item.fechaConsulta || 'Reciente'}</p>
                            `;

                            // Evento para centrar el mapa o ver detalles al hacer clic en una ruta
                            routeCard.addEventListener('click', () => {
                                L.marker([6.25184, -75.56359]).addTo(map)
                                    .bindPopup(`Ruta: ${item.ruta.origen} a ${item.ruta.destino}`)
                                    .openPopup();
                            });

                            listaHistorialDiv.appendChild(routeCard);
                        });
                    })
                    .catch(error => {
                        console.error("Error al cargar historial:", error);
                        listaHistorialDiv.innerHTML = `<p style="color: red;">Error al cargar el historial de viajes.</p>`;
                    });
            }
        }
    }, 150);
}