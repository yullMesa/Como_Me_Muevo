export function renderNotificaciones(container) {
    // 1. Inyectamos la estructura HTML del diseño que querías
    container.innerHTML = `
        <div style="padding: 20px; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            
            <!-- FILA SUPERIOR: CLIMA Y TEMAS BANCARIOS -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 25px;">
                
                <!-- WIDGET DEL CLIMA -->
                <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 2.5rem;">⛅</span>
                            <div>
                                <h2 id="climaTemp" style="margin: 0; font-size: 1.8rem; color: #1f2937;">Cargando...</h2>
                                <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Medellín • Parcialmente nublado</p>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 20px; border-top: 1px solid #f3f4f6; pt-15px; padding-top: 15px; color: #4b5563; font-size: 0.9rem;">
                        <span>💧 Humedad: <strong id="climaHumedad">--%</strong></span>
                        <span>🌬️ Viento: <strong id="climaViento">-- km/h</strong></span>
                    </div>
                </div>

                <!-- TEMAS BANCARIOS / TARJETA -->
                
               <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                       <div>
                           <div style="display: flex; align-items: center; gap: 8px; color: #E21B23; font-weight: bold; margin-bottom: 5px;">
                               <span>💳</span> Temas bancarios
                           </div>
                           <p style="margin: 0; color: #6b7280; font-size: 0.85rem;">Consulta información sobre pagos, recargas y servicios financieros.</p>
                       </div>
                       <!-- Redirige al HTML del banco que creaste (ej: banco.html) -->
                       <a href="banco.html" target="_blank" style="text-decoration: none; color: #E21B23; font-weight: bold; font-size: 1.1rem;" title="Ir al Banco">›</a>
                   </div>
                  
                   <div id="infoBancoResumen" style="background: #fdf2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 8px; margin-top: 15px; color: #991b1b; font-size: 0.9rem;">
                       Verificando estado de tu cuenta y tarjetas...
                   </div>
               </div>

            </div>

            <!-- SECCIÓN DE NOTIFICACIONES DEL SISTEMA -->
            <div style="background: #ffffff; padding: 25px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.2rem;">🚨</span>
                    <h3 style="margin: 0; font-size: 1.2rem; color: #1f2937;">Notificaciones del sistema</h3>
                </div>
                <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 0.9rem;">Mantente al tanto de los incidentes y novedades en la red de transporte.</p>

                <!-- LISTA DE ALERTAS -->
                <div style="display: flex; flex-direction: column; gap: 12px;" id="contenedorListaAlertas">
                    
                    <!-- Alerta 1 -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #f9fafb; border-radius: 10px; border-left: 4px solid #ef4444;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 1.4rem;">⚠️</span>
                            <div>
                                <h4 style="margin: 0; font-size: 0.95rem; color: #111827;">Demora en la Línea B</h4>
                                <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #4b5563;">Servicio en demora por novedad técnica en la vía férrea.</p>
                                <span style="font-size: 0.75rem; color: #9ca3af;">Hace 20 minutos</span>
                            </div>
                        </div>
                        <span style="color: #9ca3af;">›</span>
                    </div>

                    <!-- Alerta 2 -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #f9fafb; border-radius: 10px; border-left: 4px solid #f59e0b;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 1.4rem;">⚠️</span>
                            <div>
                                <h4 style="margin: 0; font-size: 0.95rem; color: #111827;">Estación Hospital cerrada</h4>
                                <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #4b5563;">Estación cerrada temporalmente por mantenimiento preventivo.</p>
                                <span style="font-size: 0.75rem; color: #9ca3af;">Hace 5 minutos</span>
                            </div>
                        </div>
                        <span style="color: #9ca3af;">›</span>
                    </div>

                    <!-- Alerta 3 -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #f9fafb; border-radius: 10px; border-left: 4px solid #10b981;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 1.4rem;">✅</span>
                            <div>
                                <h4 style="margin: 0; font-size: 0.95rem; color: #111827;">Servicio normal en Línea A</h4>
                                <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #4b5563;">Operación continua y sin contratiempos en toda la línea.</p>
                                <span style="font-size: 0.75rem; color: #9ca3af;">Hace 25 minutos</span>
                            </div>
                        </div>
                        <span style="color: #9ca3af;">›</span>
                    </div>

                    <!-- Alerta 4 -->
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #f9fafb; border-radius: 10px; border-left: 4px solid #10b981;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="font-size: 1.4rem;">✅</span>
                            <div>
                                <h4 style="margin: 0; font-size: 0.95rem; color: #111827;">Estación Hospital reabierta</h4>
                                <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #4b5563;">Se restablece el ingreso de usuarios con normalidad.</p>
                                <span style="font-size: 0.75rem; color: #9ca3af;">Hace 5 minutos</span>
                            </div>
                        </div>
                        <span style="color: #9ca3af;">›</span>
                    </div>

                </div>
            </div>

        </div>
    `;

    // 2. Ejecutar las funciones dinámicas al cargar la vista
    cargarClimaReal();
    cargarDatosBancariosUsuarioLogueado();
}

// Función para obtener el clima gratis de Medellín sin claves secretas
async function cargarClimaReal() {
    try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=6.2518&longitude=-75.5636&current=temperature_2m,relative_humidity_2m,wind_speed_10m');
        const data = await res.json();

        const tempElem = document.getElementById('climaTemp');
        const humElem = document.getElementById('climaHumedad');
        const vientoElem = document.getElementById('climaViento');

        if (tempElem) tempElem.innerText = `${Math.round(data.current.temperature_2m)}°C`;
        if (humElem) humElem.innerText = `${data.current.relative_humidity_2m}%`;
        if (vientoElem) vientoElem.innerText = `${data.current.wind_speed_10m} km/h`;
    } catch (e) {
        console.error("No se pudo obtener el clima:", e);
    }
}

// Función para consultar las tarjetas del usuario logueado en el backend
async function cargarDatosBancariosUsuarioLogueado() {
    const correo = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');
    const contenedorBanco = document.getElementById('infoBancoResumen');

    if (!correo || !contenedorBanco) return;

    try {
        const response = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correo)}`);
        if (response.ok) {
            const tarjetas = await response.json();
            if (tarjetas && tarjetas.length > 0) {
                const t = tarjetas[0];
                contenedorBanco.innerHTML = `
                   <strong>Tarjeta Activa:</strong> ${t.numeroTarjeta}<br>
                   <strong>Saldo Disponible:</strong> <span style="color: #16a34a; font-weight: bold;">$ ${t.saldo.toLocaleString()}</span>
               `;
                contenedorBanco.style.background = "#f0fdf4";
                contenedorBanco.style.borderColor = "#bbf7d0";
                contenedorBanco.style.color = "#166534";
            } else {
                // Redirige al banco.html en lugar de la tienda
                contenedorBanco.innerHTML = `No tienes cuentas asociadas. <a href="banco.html" target="_blank" style="color: #E21B23; font-weight: bold;">¡Entra al Banco aquí!</a>`;
            }
        }
    } catch (e) {
        console.error("Error consultando banco:", e);
    }
}