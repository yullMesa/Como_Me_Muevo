export function renderHistorialRutas(container) {
    container.innerHTML = `
       <div class="historial-main-container" style="padding: 20px; max-width: 1400px; margin: 0 auto;">
           <div class="historial-header" style="margin-bottom: 20px;">
               <h2 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0;">Rutas realizadas</h2>
               <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Consulta el historial de tus viajes y recorridos completados.</p>
           </div>
           
           <div class="historial-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
               
               <!-- Sección de la lista de rutas con scroll interno controlado -->
               <div class="routes-list-section" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                   <h3 style="margin-bottom: 15px; font-size: 16px; color: #1f2937; font-weight: 600;">Tus Viajes Recientes</h3>
                   <div id="listaHistorial" style="display: flex; flex-direction: column; gap: 10px; max-height: 500px; overflow-y: auto; padding-right: 5px;">
                       <p style="color: #6b7280; font-size: 14px;">Cargando viajes desde la base de datos...</p>
                   </div>
               </div>

               <!-- Sección del Mapa Fija y Visible -->
               <div class="route-map-section" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); position: sticky; top: 20px;">
                   <h3 style="margin-bottom: 15px; font-size: 16px; color: #1f2937; font-weight: 600;">Detalle del viaje en el Mapa</h3>
                   <div id="mapaHistorial" style="width: 100%; height: 450px; border-radius: 8px; z-index: 1;"></div>
               </div>
           </div>
       </div>
   `;

    setTimeout(() => {
        const mapaDiv = document.getElementById('mapaHistorial');
        if (mapaDiv) {
            // Invalidar dimensiones previas si existían para evitar el fallo del mapa gris
            if (mapaDiv._leaflet_id) {
                mapaDiv._leaflet_id = null;
            }

            const map = L.map('mapaHistorial', { zoomControl: false }).setView([6.25184, -75.56359], 13);
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            const correoUsuario = localStorage.getItem('correoUsuario');
            const listaHistorialDiv = document.getElementById('listaHistorial');

            if (correoUsuario) {
                fetch(`http://localhost:8080/api/rutas/historial?correo=${correoUsuario}`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data || data.length === 0) {
                            listaHistorialDiv.innerHTML = `<p style="color: #6b7280; font-size: 14px;">No tienes rutas registradas todavía.</p>`;
                            return;
                        }
                        listaHistorialDiv.innerHTML = '';

                        let currentMarker = null;

                        data.forEach(item => {
                            const routeCard = document.createElement('div');
                            routeCard.className = 'route-item-card';
                            routeCard.style.cssText = 'padding: 14px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f9fafb;';

                            routeCard.innerHTML = `
                               <strong style="color: #1f2937; font-size: 14px; text-transform: uppercase;">${item.ruta.origen} → ${item.ruta.destino}</strong>
                               <p style="margin: 6px 0 0; font-size: 12px; color: #4b5563;">🕒 Tiempo: ${item.ruta.tiempoEstimado} mins &nbsp;|&nbsp; 📅 ${item.fechaConsulta || 'Reciente'}</p>
                           `;

                            // Efecto hover sutil
                            routeCard.addEventListener('mouseenter', () => { routeCard.style.background = '#f3f4f6'; });
                            routeCard.addEventListener('mouseleave', () => { routeCard.style.background = '#f9fafb'; });

                            // Evento al hacer clic en un viaje del historial
                            routeCard.addEventListener('click', () => {
                                if (currentMarker) {
                                    map.removeLayer(currentMarker);
                                }
                                // Coordenada de ejemplo centrada en Medellín para el marcador
                                const latLng = [6.2442, -75.5720];
                                currentMarker = L.marker(latLng).addTo(map)
                                    .bindPopup(`<b>Trayecto:</b> ${item.ruta.origen.toUpperCase()} a ${item.ruta.destino.toUpperCase()}`)
                                    .openPopup();

                                map.setView(latLng, 14);
                            });

                            listaHistorialDiv.appendChild(routeCard);
                        });
                    })
                    .catch(error => {
                        console.error("Error al cargar historial:", error);
                        listaHistorialDiv.innerHTML = `<p style="color: #dc2626; font-size: 14px;">Error al cargar el historial de viajes.</p>`;
                    });
            }
        }
    }, 150);
}