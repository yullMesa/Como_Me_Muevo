export function renderHistorialRutas(container) {
    container.innerHTML = `
        <div class="historial-main-container" style="padding: 20px;">
            <div class="historial-header" style="margin-bottom: 20px;">
                <h2>Rutas realizadas</h2>
                <p style="color: #666;">Consulta el historial de tus viajes y recorridos completados.</p>
            </div>

            <!-- Tarjetas de Estadísticas superiores -->
            <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
                <div class="stat-card" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; color: #666;">Viajes realizados</span>
                    <h3 style="margin: 5px 0 0; color: #333;">4</h3>
                </div>
                <div class="stat-card" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; color: #666;">Distancia total</span>
                    <h3 style="margin: 5px 0 0; color: #333;">45.2 km</h3>
                </div>
                <div class="stat-card" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; color: #666;">Tiempo total</span>
                    <h3 style="margin: 5px 0 0; color: #333;">2h 15 min</h3>
                </div>
                <div class="stat-card" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; color: #666;">Gasto estimado</span>
                    <h3 style="margin: 5px 0 0; color: #333;">$8.800</h3>
                </div>
            </div>

            <!-- Contenedor principal dividido (Lista izquierda / Mapa derecha) -->
            <div class="historial-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                
                <!-- Sección de la lista de rutas -->
                <div class="routes-list-section" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="margin-bottom: 15px;">Tus Viajes Recientes</h3>
                    <div id="listaHistorial" style="display: flex; flex-direction: column; gap: 10px;">
                        <!-- Ejemplo estático de tarjeta de ruta que luego conectaremos dinámicamente -->
                        <div class="route-item-card" style="padding: 12px; border: 1px solid #eaeaea; border-radius: 6px; cursor: pointer; transition: background 0.2s;">
                            <strong style="color: #333;">San Antonio → Poblado</strong>
                            <p style="margin: 5px 0 0; font-size: 13px; color: #666;">🕒 35 min &nbsp;|&nbsp; 📏 12.4 km &nbsp;|&nbsp; 🚌 Bus</p>
                        </div>
                    </div>
                </div>

                <!-- Sección del Mapa e Interfaz de Detalle -->
                <div class="route-map-section" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <h3 style="margin-bottom: 15px;">Detalle del viaje en el Mapa</h3>
                    <div id="mapaHistorial" style="width: 100%; height: 320px; border-radius: 6px; z-index: 1;"></div>
                </div>

            </div>
        </div>
    `;

    // Inicializar el mapa de Leaflet de forma segura después de que el HTML esté montado
    setTimeout(() => {
        const mapaDiv = document.getElementById('mapaHistorial');
        if (mapaDiv) {
            // Coordenadas base (ej: Área metropolitana / Medellín)
            const map = L.map('mapaHistorial').setView([6.25184, -75.56359], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Marcador de ejemplo inicial
            L.marker([6.25184, -75.56359]).addTo(map)
                .bindPopup('Punto de partida del viaje')
                .openPopup();
        }
    }, 150);

    const correoUsuario = localStorage.getItem('correoUsuario');
    console.log("Cargando interfaz visual y mapa de historial para:", correoUsuario);
}