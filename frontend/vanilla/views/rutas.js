let routeLayer = null; // Variable global para guardar la línea actual del mapa

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
                        <input type="text" id="inputOrigen" placeholder="Ej: Niquia" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc;">
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label class="info-label">Destino:</label>
                        <input type="text" id="inputDestino" placeholder="Ej: Poblado" style="width: 100%; padding: 8px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc;">
                    </div>
                    <button id="btnCalcularRuta" class="btn-editar-perfil" style="width: 100%; cursor: pointer;">Calcular Ruta</button>
                    
                    <!-- Contenedor para mostrar el resultado de la búsqueda -->
                    <div id="resultadoRuta" style="margin-top: 15px; font-size: 14px; color: #333;"></div>
                </div>

                <!-- Contenedor del Mapa Interactivo -->
                <div class="card perfil-card" style="padding: 10px; height: 450px;">
                    <div id="map" style="width: 100%; height: 100%; border-radius: 8px;"></div>
                </div>

            </div>
        </div>
    `;

    setTimeout(() => {
        const map = inicializarMapa();

        const btnCalcular = document.getElementById('btnCalcularRuta');
        const resultadoDiv = document.getElementById('resultadoRuta');

        // Coordenadas aproximadas de ejemplo para las estaciones del Valle de Aburrá
        const coordenadasEstaciones = {
            "niquia": [6.3402, -75.5451],
            "poblado": [6.2104, -75.5785],
            "bello": [6.3342, -75.5564],
            "acevedo": [6.2915, -75.5682],
            "universidad": [6.2671, -75.5679],
            "san antonio": [6.2518, -75.5670]
        };

        btnCalcular.addEventListener('click', async () => {
            const origen = document.getElementById('inputOrigen').value.trim();
            const destino = document.getElementById('inputDestino').value.trim();


            const correoUsuario = localStorage.getItem('usuarioEmail') || localStorage.getItem('correo') || 'yullmesa@admin.com'; // Ajusta la key según la uses en tu login

            if (!origen || !destino) {
                resultadoDiv.innerHTML = '<span style="color: red;">Por favor completa origen y destino.</span>';
                return;
            }

            resultadoDiv.innerHTML = 'Consultando ruta en el servidor...';

            try {
                const response = await fetch(`http://localhost:8080/api/rutas/buscar?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&correo=${encodeURIComponent(correoUsuario)}`);

                if (response.ok) {
                    const rutas = await response.json();
                    if (rutas.length > 0) {
                        const r = rutas[0];
                        resultadoDiv.innerHTML = `
                            <div style="background: #e6f4ea; padding: 10px; border-radius: 6px; border: 1px solid #34a853;">
                                <b>✅ ¡Ruta Encontrada!</b><br>
                                <b>Origen:</b> ${r.origen}<br>
                                <b>Destino:</b> ${r.destino}<br>
                                <b>Tiempo estimado:</b> ${r.tiempoEstimado ? r.tiempoEstimado + ' mins' : 'No especificado'}
                            </div>
                        `;

                        // --- LÓGICA PARA TRAZAR LA RUTA EN EL MAPA ---
                        if (routeLayer) {
                            map.removeLayer(routeLayer); // Borrar ruta anterior si existe
                        }

                        // Buscar coordenadas basadas en el texto ingresado (o usar valores por defecto si no están en el diccionario)
                        const orgKey = r.origen.toLowerCase();
                        const desKey = r.destino.toLowerCase();

                        const coordsOrigen = coordenadasEstaciones[orgKey] || [6.2442, -75.5812]; // Centro Medellín por defecto
                        const coordsDestino = coordenadasEstaciones[desKey] || [6.2104, -75.5785];

                        // Dibujar línea (Polyline) conectando origen y destino
                        routeLayer = L.polyline([coordsOrigen, coordsDestino], {
                            color: '#d93025',
                            weight: 5,
                            opacity: 0.8
                        }).addTo(map);

                        // Ajustar la vista del mapa para que encuadre la ruta completa
                        map.fitBounds(routeLayer.getBounds(), { padding: [50, 50] });

                    } else {
                        resultadoDiv.innerHTML = '<span style="color: #d93025;">No se encontraron rutas registradas para ese trayecto.</span>';
                    }
                } else {
                    resultadoDiv.innerHTML = '<span style="color: #d93025;">No se encontraron rutas para ese trayecto.</span>';
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                resultadoDiv.innerHTML = '<span style="color: #d93025;">No se pudo conectar con el servidor backend.</span>';
            }
        });
    }, 100);
}

function inicializarMapa() {
    const containerMap = L.DomUtil.get('map');
    if (containerMap != null) {
        containerMap._leaflet_id = null;
    }

    const map = L.map('map').setView([6.2442, -75.5812], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
}