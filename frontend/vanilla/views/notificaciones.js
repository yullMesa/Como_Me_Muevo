export function renderNotificaciones(container) {
    // 1. Inyectamos la estructura HTML con el selector y el cuadro de código temporal
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
                  <div style="display: flex; justify-content: space-between; margin-top: 20px; border-top: 1px solid #f3f4f6; padding-top: 15px; color: #4b5563; font-size: 0.9rem;">
                      <span>💧 Humedad: <strong id="climaHumedad">--%</strong></span>
                      <span>🌬️ Viento: <strong id="climaViento">-- km/h</strong></span>
                  </div>
              </div>

              <!-- TEMAS BANCARIOS / DOS COLUMNAS LADO A LADO -->
              <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                      <div>
                          <div style="display: flex; align-items: center; gap: 8px; color: #E21B23; font-weight: bold; margin-bottom: 5px;">
                              <span>💳</span> Temas bancarios
                          </div>
                          <p style="margin: 0; color: #6b7280; font-size: 0.85rem;">Consulta información sobre pagos, recargas y servicios financieros.</p>
                      </div>
                      <a href="banco.html" target="_blank" style="text-decoration: none; color: #E21B23; font-weight: bold; font-size: 1.1rem;" title="Ir al Banco">›</a>
                  </div>
               
                  <!-- FILA INTERNA: SELECTOR DE BANCO Y CUADRO DE CÓDIGO TEMPORAL -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: stretch;">
                     
                      <!-- Columna Izquierda: Selector de Banco -->
                      <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 12px; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                          <label for="selectTipoBanco" style="font-size: 0.8rem; font-weight: bold; color: #374151; margin-bottom: 6px; display: block;">Seleccionar Banco:</label>
                          <select id="selectTipoBanco" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #d1d5db; font-size: 0.8rem; background: #ffffff; color: #1f2937; outline: none;">
                              <option value="comopago">Como Pago</option>
                              <option value="proximos">Próximos bancos</option>
                          </select>
                          <small style="color: #6b7280; font-size: 0.7rem; margin-top: 4px;">Entidad activa.</small>
                      </div>

                      <!-- Columna Derecha: Cuadro Rojo para el Código y Temporizador -->
                      <div id="infoBancoResumen" style="background: #fdf2f2; border: 1px solid #fecaca; padding: 12px; border-radius: 10px; color: #991b1b; font-size: 0.8rem; display: flex; flex-direction: column; justify-content: center;">
                          <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Código para consignar dinero correctamente:</strong>
                          <span id="codigoConsignacionText" style="font-family: monospace; font-weight: bold; font-size: 0.85rem; color: #b91c1c;">Cargando código...</span>
                      </div>

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
             
              <div style="display: flex; flex-direction: column; gap: 12px;" id="contenedorListaAlertas">
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
              </div>
          </div>
      </div>
  `;

    cargarClimaReal();
    cargarDatosBancariosUsuarioLogueado();
}

// Función para obtener el clima real de Medellín
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

// Gestión del Banco y Token de 3 minutos
async function cargarDatosBancariosUsuarioLogueado() {
    const correo = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');
    const contenedorBanco = document.getElementById('infoBancoResumen');
    const selectBanco = document.getElementById('selectTipoBanco');
    if (!correo || !contenedorBanco) return;

    // Control del selector entre Como Pago y Próximos Bancos
    if (selectBanco) {
        selectBanco.addEventListener('change', (e) => {
            if (e.target.value === 'proximos') {
                if (window.intervaloToken) clearInterval(window.intervaloToken);
                contenedorBanco.innerHTML = `
                   <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Próximos Bancos:</strong>
                   <span style="font-size: 0.75rem; color: #92400e;">Nuevas integraciones financieras próximamente.</span>
               `;
                contenedorBanco.style.background = "#fffbeb";
                contenedorBanco.style.borderColor = "#fde68a";
            } else {
                verificarTarjetasYGenerarToken(correo, contenedorBanco);
            }
        });
    }

    verificarTarjetasYGenerarToken(correo, contenedorBanco);
}

async function verificarTarjetasYGenerarToken(correo, contenedorBanco) {
    try {
        const response = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correo)}`);
        if (response.ok) {
            const tarjetas = await response.json();
            if (tarjetas && tarjetas.length > 0) {
                const tarjetaActiva = tarjetas[0];
                // Inicia el token con temporizador de 3 minutos (180 segundos)
                iniciarTemporizadorToken(contenedorBanco, tarjetaActiva);
            } else {
                contenedorBanco.innerHTML = `
                   <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Código de consignación:</strong>
                   <span style="font-size: 0.75rem; color: #991b1b; display: block; margin-bottom: 4px;">Sin cuenta asociada.</span>
                   <a href="banco.html" target="_blank" style="color: #E21B23; font-weight: bold; text-decoration: underline; font-size: 0.75rem;">Crear cuenta en Banco</a>
               `;
                contenedorBanco.style.background = "#fdf2f2";
                contenedorBanco.style.borderColor = "#fecaca";
            }
        }
    } catch (e) {
        console.error("Error consultando banco:", e);
        contenedorBanco.innerHTML = `
           <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Código de consignación:</strong>
           <span style="font-size: 0.75rem; color: #991b1b;">Error al conectar con el servidor.</span>
       `;
    }
}

// Lógica del temporizador de 3 minutos para el Token de depósito
function iniciarTemporizadorToken(contenedorBanco, tarjeta) {
    // Generamos o simulamos el token recibido del backend
    const tokenGenerado = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
    let tiempoRestante = 180; // 180 segundos = 3 minutos

    function actualizarContador() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const formatoTiempo = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        if (tiempoRestante > 0) {
            contenedorBanco.innerHTML = `
               <div style="display: flex; justify-content: space-between; align-items: center;">
                   <div>
                       <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Código temporal para consignar:</strong>
                       <span style="font-family: monospace; font-weight: bold; font-size: 0.9rem; color: #166534;">${tokenGenerado}</span>
                       <span style="font-size: 0.65rem; color: #166534; display: block; margin-top: 2px;">Saldo: $ ${tarjeta.saldo.toLocaleString()}</span>
                   </div>
                   <div style="text-align: right;">
                       <span style="font-size: 0.65rem; color: #991b1b; display: block; font-weight: bold;">Expira en:</span>
                       <span style="font-family: monospace; font-size: 0.8rem; font-weight: bold; color: #b91c1c;">${formatoTiempo}</span>
                   </div>
               </div>
           `;
            contenedorBanco.style.background = "#f0fdf4";
            contenedorBanco.style.borderColor = "#bbf7d0";
            tiempoRestante--;
        } else {
            // Cuando se pasa el tiempo de los 3 minutos
            contenedorBanco.innerHTML = `
               <div style="display: flex; justify-content: space-between; align-items: center;">
                   <div>
                       <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Código de consignación:</strong>
                       <span style="font-size: 0.75rem; color: #991b1b; font-weight: bold;">Token expirado (>3 min).</span>
                   </div>
                   <button id="btnRenovarToken" style="background: #E21B23; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; cursor: pointer; font-weight: bold;">Generar nuevo</button>
               </div>
           `;
            contenedorBanco.style.background = "#fdf2f2";
            contenedorBanco.style.borderColor = "#fecaca";

            const btnRenovar = document.getElementById('btnRenovarToken');
            if (btnRenovar) {
                btnRenovar.addEventListener('click', () => {
                    iniciarTemporizadorToken(contenedorBanco, tarjeta);
                });
            }
            clearInterval(window.intervaloToken);
        }
    }

    if (window.intervaloToken) clearInterval(window.intervaloToken);
    actualizarContador();
    window.intervaloToken = setInterval(actualizarContador, 1000);
}