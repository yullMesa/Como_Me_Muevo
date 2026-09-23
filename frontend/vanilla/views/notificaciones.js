export function renderNotificaciones(container) {
    // 1. Inyectamos la estructura HTML actualizada sin selector de bancos y con diseño semi-transparente interactivo
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

             <!-- TEMAS BANCARIOS / ACCESO DIRECTO AL BANCO (COMO PAGO) -->
             <div id="cardTemasBancarios" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); border: 1px solid rgba(226, 27, 35, 0.2); padding: 20px; border-radius: 14px; box-shadow: 0 4px 16px rgba(226, 27, 35, 0.08); display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: all 0.3s ease;" title="Haz clic para ingresar al banco">
                 <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                     <div>
                         <div style="display: flex; align-items: center; gap: 8px; color: #E21B23; font-weight: bold; margin-bottom: 5px;">
                             <span>💳</span> Como Pago (Entidad Financiera Oficial)
                         </div>
                         <p style="margin: 0; color: #6b7280; font-size: 0.85rem;">Presiona aquí para ingresar a tu cuenta bancaria y gestionar pagos.</p>
                     </div>
                     <span style="color: #E21B23; font-weight: bold; font-size: 1.2rem;">›</span>
                 </div>
             
                 <!-- CUADRO DE CÓDIGO TEMPORAL Y ESTADO -->
                 <div id="infoBancoResumen" style="background: rgba(253, 242, 242, 0.8); border: 1px dashed #fecaca; padding: 14px; border-radius: 10px; color: #991b1b; font-size: 0.8rem; display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease;">
                     <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Verificando estado de tu cuenta y tarjetas...</strong>
                     <span id="codigoConsignacionText" style="font-family: monospace; font-weight: bold; font-size: 0.85rem; color: #b91c1c;">Conectando con el servidor...</span>
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

    const cardBanco = document.getElementById('cardTemasBancarios');
    if (cardBanco) {
        cardBanco.addEventListener('click', () => {
            window.open('banco.html', '_blank');
        });
        cardBanco.addEventListener('mouseenter', () => {
            cardBanco.style.transform = 'translateY(-2px)';
            cardBanco.style.boxShadow = '0 6px 20px rgba(226, 27, 35, 0.15)';
        });
        cardBanco.addEventListener('mouseleave', () => {
            cardBanco.style.transform = 'translateY(0)';
            cardBanco.style.boxShadow = '0 4px 16px rgba(226, 27, 35, 0.08)';
        });
    }

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

// Gestión del Banco y Token recibido desde la tienda
async function cargarDatosBancariosUsuarioLogueado() {
    const correo = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');
    const contenedorBanco = document.getElementById('infoBancoResumen');
    if (!correo || !contenedorBanco) return;

    try {
        const response = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correo)}`);
        if (response.ok) {
            const tarjetas = await response.json();
            const tarjetaActiva = (tarjetas && tarjetas.length > 0) ? tarjetas[0] : { tipo: 'General', saldo: 0 };

            const tokenGuardadoJSON = localStorage.getItem('codigoConsignacionActivo');

            if (tokenGuardadoJSON) {
                const datosToken = JSON.parse(tokenGuardadoJSON);
                const tiempoRestanteMs = datosToken.expiracion - Date.now();

                if (tiempoRestanteMs > 0) {
                    iniciarTemporizadorToken(contenedorBanco, tarjetaActiva, datosToken.codigo, Math.floor(tiempoRestanteMs / 1000));
                } else {
                    mostrarEstadoSinToken(contenedorBanco);
                }
            } else {
                mostrarEstadoSinToken(contenedorBanco);
            }
        }
    } catch (e) {
        console.error("Error consultando banco:", e);
        contenedorBanco.innerHTML = `
          <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Aviso financiero:</strong>
          <span style="font-size: 0.75rem; color: #991b1b;">Haz clic para abrir el portal bancario.</span>
      `;
    }
}

function mostrarEstadoSinToken(contenedorBanco) {
    contenedorBanco.innerHTML = `
      <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem; color: #991b1b;">⚠️ Sin código de consignación activo:</strong>
      <span style="font-size: 0.75rem; color: #6b7280; display: block; margin-bottom: 2px;">Genera uno desde la tienda al intentar comprar sin saldo.</span>
  `;
    contenedorBanco.style.background = "rgba(253, 242, 242, 0.9)";
    contenedorBanco.style.borderColor = "#fecaca";
}

// Lógica del temporizador sincronizado con portapapeles
function iniciarTemporizadorToken(contenedorBanco, tarjeta, codigoRef, segundosIniciales) {
    let tiempoRestante = segundosIniciales;

    reproducirSonidoAlerta();

    contenedorBanco.onclick = function() {
        navigator.clipboard.writeText(codigoRef).then(() => {
            alert(`📋 ¡Código ${codigoRef} copiado al portapapeles exitosamente!`);
        }).catch(err => {
            console.error("Error al copiar al portapapeles: ", err);
        });
    };

    function actualizarContador() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const formatoTiempo = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        if (tiempoRestante > 0) {
            contenedorBanco.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                      <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem; color: #166534;">🔔 ¡Nuevo código recibido! (Haz clic para copiar):</strong>
                      <span style="font-family: monospace; font-weight: bold; font-size: 0.9rem; color: #15803d; background: #dcfce7; padding: 2px 6px; border-radius: 4px;">${codigoRef}</span>
                      <span style="font-size: 0.65rem; color: #166534; display: block; margin-top: 3px;">Saldo tarjeta (${tarjeta.tipo}): $ ${(tarjeta.saldo || 0).toLocaleString()}</span>
                  </div>
                  <div style="text-align: right;">
                      <span style="font-size: 0.65rem; color: #991b1b; display: block; font-weight: bold;">Expira en:</span>
                      <span style="font-family: monospace; font-size: 0.8rem; font-weight: bold; color: #b91c1c;">${formatoTiempo}</span>
                  </div>
              </div>
          `;
            contenedorBanco.style.background = "rgba(240, 253, 244, 0.95)";
            contenedorBanco.style.borderColor = "#86efac";
            contenedorBanco.style.cursor = "pointer";
            tiempoRestante--;
        } else {
            contenedorBanco.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                      <strong style="display: block; margin-bottom: 2px; font-size: 0.75rem;">Código expirado (>3 min):</strong>
                      <span style="font-size: 0.75rem; color: #991b1b; font-weight: bold;">Genera un nuevo código desde la tienda.</span>
                  </div>
              </div>
          `;
            contenedorBanco.style.background = "rgba(253, 242, 242, 0.9)";
            contenedorBanco.style.borderColor = "#fecaca";
            contenedorBanco.onclick = null;
            clearInterval(window.intervaloToken);
        }
    }

    if (window.intervaloToken) clearInterval(window.intervaloToken);
    actualizarContador();
    window.intervaloToken = setInterval(actualizarContador, 1000);
}

// Reproductor de sonido nativo (Web Audio API) declarado una sola vez
function reproducirSonidoAlerta() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
        console.log("Audio omitido por políticas del navegador", e);
    }
}