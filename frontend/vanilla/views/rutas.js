export function renderRutas(container) {
    container.innerHTML = `
        <div class="rutas-wrapper">
            <div class="perfil-header-section">
                <div>
                    <h2 class="perfil-title">Planificador de Rutas</h2>
                    <p class="perfil-subtitle">Visualiza estaciones y calcula tus trayectos en el mapa.</p>
                </div>
            </div>

            <!-- Contenedor principal de la sección de rutas -->
            <div class="rutas-grid" style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin-top: 20px;">
                
                <!-- Panel de control / Buscador -->
                <div class="card perfil-card" style="padding: 20px;">
                    <h3 class="card-title" style="margin-bottom: 15px;">Buscar Trayecto</h3>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="info-label">Origen:</label>
                        <input type="text" id="inputOrigen" placeholder="Ej: Estación Niquía" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc;">
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="info-label">Destino:</label>
                        <input type="text" id="inputDestino" placeholder="Ej: Estación Poblado" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc;">
                    </div>
                    <button id="btnCalcularRuta" class="btn-editar-perfil" style="width: 100%; cursor: pointer;">Calcular Ruta</button>
                </div>

                <!-- Contenedor del Mapa Interactivo -->
                <div class="card perfil-card" style="padding: 10px; height: 450px;">
                    <div id="map" style="width: 100%; height: 100%; border-radius: 8px;"></div>
                </div>

            </div>
        </div>
    `;

    // Inicializar el mapa de Leaflet después de que el HTML se haya inyectado
    setTimeout(() => {
        inicializarMapa();
    }, 100);
}

function inicializarMapa() {
    // Evitar que Leaflet se reinicialice si ya existe el mapa
    const containerMap = L.DomUtil.get('map');
    if (containerMap != null) {
        containerMap._leaflet_id = null;
    }

    // Coordenadas centradas por defecto en Medellín
    const map = L.map('map').setView([6.2442, -75.5812], 13);

    // Capa visual gratuita de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador de ejemplo (puedes adaptarlo luego con las estaciones reales)
    L.marker([6.2442, -75.5812]).addTo(map)
        .bindPopup('<b>¿Cómo me muevo?</b><br>Punto central de operaciones.')
        .openPopup();
}