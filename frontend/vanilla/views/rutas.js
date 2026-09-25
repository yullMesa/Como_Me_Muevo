let routeLayer = null; // Variable global para guardar la línea actual del mapa

export function renderRutas(container) {
    container.innerHTML = `
       <div class="rutas-wrapper">
           <div class="perfil-header-section">
               <div>
                   <h2 class="perfil-title">Planificador de Rutas</h2>
                   <p class="perfil-subtitle">Selecciona tu medio de transporte y visualiza el paso a paso de tu trayecto.</p>
               </div>
           </div>

           <!-- Contenedor principal de la sección de rutas (Buscador + Mapa) -->
           <div class="rutas-grid" style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin-top: 20px;">
              
               <!-- Panel de control / Buscador -->
               <div class="card perfil-card" style="padding: 20px;">
                   <h3 class="card-title" style="margin-bottom: 15px;">Buscar Trayecto</h3>
                   
                   <div class="form-group" style="margin-bottom: 15px;">
                       <label class="info-label" style="font-weight: 600; font-size: 13px; color: #444;">Medio de Transporte:</label>
                       <select id="selectTransporte" style="width: 100%; padding: 9px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc; background: #fff; font-size: 14px;">
                           <option value="metro">🚇 Metro / Masivo</option>
                           <option value="bus">🚌 Bus / Integrado</option>
                           <option value="carro">🚗 Automóvil</option>
                           <option value="moto">🏍️ Motocicleta</option>
                           <option value="pie">🚶‍♂️ A pie</option>
                       </select>
                   </div>

                   <div class="form-group" style="margin-bottom: 15px;">
                       <label class="info-label" style="font-weight: 600; font-size: 13px; color: #444;">Origen:</label>
                       <input type="text" id="inputOrigen" placeholder="Ej: Niquia" style="width: 100%; padding: 9px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box; font-size: 14px;">
                   </div>

                   <div class="form-group" style="margin-bottom: 15px;">
                       <label class="info-label" style="font-weight: 600; font-size: 13px; color: #444;">Destino:</label>
                       <input type="text" id="inputDestino" placeholder="Ej: Poblado" style="width: 100%; padding: 9px; margin-top: 5px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box; font-size: 14px;">
                   </div>

                   <button id="btnCalcularRuta" class="btn-editar-perfil" style="width: 100%; cursor: pointer; padding: 10px; font-weight: bold;">Calcular Ruta</button>
                  
                   <!-- Contenedor para mostrar el resultado resumido -->
                   <div id="resultadoRuta" style="margin-top: 15px; font-size: 14px; color: #333;"></div>
               </div>

               <!-- Contenedor del Mapa Interactivo -->
               <div class="card perfil-card" style="padding: 10px; height: 460px;">
                   <div id="map" style="width: 100%; height: 100%; border-radius: 8px;"></div>
               </div>
           </div>

           <!-- Sección Inferior: Paso a Paso en Cuadros de Izquierda a Derecha -->
           <div class="card perfil-card" style="margin-top: 20px; padding: 20px;">
               <h3 class="card-title" style="margin-bottom: 15px; font-size: 16px; color: #1f2937;">🧭 Guía Paso a Paso del Recorrido</h3>
               <div id="pasosRutaContainer" style="display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; min-height: 110px; align-items: stretch;">
                   <div style="flex: 1; min-width: 250px; background: #f9fafb; border: 1px dashed #d1d5db; border-radius: 8px; padding: 15px; display: flex; align-items: center; justify-content: center; color: #6b7280; font-size: 13px; text-align: center;">
                       Ingresa origen, destino y presiona "Calcular Ruta" para ver el itinerario paso a paso.
                   </div>
               </div>
           </div>
       </div>
   `;

    setTimeout(() => {
        const map = inicializarMapa();
        const btnCalcular = document.getElementById('btnCalcularRuta');
        const resultadoDiv = document.getElementById('resultadoRuta');
        const pasosContainer = document.getElementById('pasosRutaContainer');

        // Coordenadas aproximadas para las estaciones del Valle de Aburrá
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
            const transporte = document.getElementById('selectTransporte').value;
            const correoUsuario = localStorage.getItem('correoUsuario');

            if (!correoUsuario) {
                resultadoDiv.innerHTML = '<span style="color: red;">Error: No hay sesión activa.</span>';
                return;
            }

            resultadoDiv.innerHTML = 'Consultando ruta...';
            pasosContainer.innerHTML = '<div style="color: #666; font-size: 14px; padding: 10px;">Generando itinerario...</div>';

            try {
                const response = await fetch(`http://localhost:8080/api/rutas/buscar?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&correo=${encodeURIComponent(correoUsuario)}`);

                if (response.ok) {
                    const rutas = await response.json();
                    if (rutas.length > 0) {
                        const r = rutas[0];
                        const tiempo = r.tiempoEstimado ? r.tiempoEstimado : '15';

                        // Icono y texto según transporte seleccionado
                        let iconoTransporte = "🚇";
                        let textoTransporte = "en Línea A del Metro";
                        if (transporte === 'bus') { iconoTransporte = "🚌"; textoTransporte = "en Ruta Integrada de Bus"; }
                        if (transporte === 'carro') { iconoTransporte = "🚗"; textoTransporte = "conduciendo Automóvil"; }
                        if (transporte === 'moto') { iconoTransporte = "🏍️"; textoTransporte = "conduciendo Motocicleta"; }
                        if (transporte === 'pie') { iconoTransporte = "🚶‍♂️"; textoTransporte = "caminando a pie"; }

                        resultadoDiv.innerHTML = `
                           <div style="background: #e6f4ea; padding: 10px; border-radius: 6px; border: 1px solid #34a853;">
                               <b>✅ ¡Ruta Calculada!</b><br>
                               <b>Medio:</b> ${iconoTransporte} ${transporte.toUpperCase()}<br>
                               <b>Tiempo aprox:</b> ${tiempo} mins
                           </div>
                       `;

                        // Generar tarjetas dinámicas de izquierda a derecha (Paso a paso)
                        pasosContainer.innerHTML = `
                           <div style="flex: 1; min-width: 220px; background: #ffffff; border: 1px solid #e5e7eb; border-left: 4px solid #2563eb; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                               <span style="font-size: 11px; font-weight: bold; color: #2563eb; text-transform: uppercase;">Paso 1</span>
                               <h4 style="margin: 5px 0 3px 0; font-size: 14px; color: #1f2937;">Origen: ${r.origen}</h4>
                               <p style="margin: 0; font-size: 12px; color: #4b5563;">Dirígete al punto de partida o estación inicial.</p>
                           </div>

                           <div style="flex: 1; min-width: 220px; background: #ffffff; border: 1px solid #e5e7eb; border-left: 4px solid #16a34a; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                               <span style="font-size: 11px; font-weight: bold; color: #16a34a; text-transform: uppercase;">Paso 2 (${tiempo} mins)</span>
                               <h4 style="margin: 5px 0 3px 0; font-size: 14px; color: #1f2937;">Tránsito ${iconoTransporte}</h4>
                               <p style="margin: 0; font-size: 12px; color: #4b5563;">Viaja ${textoTransporte} desde ${r.origen} hasta ${r.destino}.</p>
                           </div>

                           <div style="flex: 1; min-width: 220px; background: #ffffff; border: 1px solid #e5e7eb; border-left: 4px solid #dc2626; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                               <span style="font-size: 11px; font-weight: bold; color: #dc2626; text-transform: uppercase;">Paso 3</span>
                               <h4 style="margin: 5px 0 3px 0; font-size: 14px; color: #1f2937;">Destino: ${r.destino}</h4>
                               <p style="margin: 0; font-size: 12px; color: #4b5563;">Has llegado a tu destino final con éxito.</p>
                           </div>
                       `;

                        // --- LÓGICA PARA TRAZAR LA RUTA EN EL MAPA ---
                        if (routeLayer) {
                            map.removeLayer(routeLayer);
                        }
                        const orgKey = r.origen.toLowerCase();
                        const desKey = r.destino.toLowerCase();
                        const coordsOrigen = coordenadasEstaciones[orgKey] || [6.2442, -75.5812];
                        const coordsDestino = coordenadasEstaciones[desKey] || [6.2104, -75.5785];

                        routeLayer = L.polyline([coordsOrigen, coordsDestino], {
                            color: transporte === 'pie' ? '#10b981' : (transporte === 'metro' ? '#2563eb' : '#d93025'),
                            weight: 5,
                            opacity: 0.8
                        }).addTo(map);

                        map.fitBounds(routeLayer.getBounds(), { padding: [50, 50] });
                    } else {
                        resultadoDiv.innerHTML = '<span style="color: #d93025;">No se encontraron rutas registradas.</span>';
                        pasosContainer.innerHTML = '<div style="color: #d93025; font-size: 13px; padding: 10px;">No hay información de pasos disponible para este trayecto.</div>';
                    }
                } else {
                    resultadoDiv.innerHTML = '<span style="color: #d93025;">Error al buscar la ruta.</span>';
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                resultadoDiv.innerHTML = '<span style="color: #d93025;">No se pudo conectar con el servidor.</span>';
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