export function renderNotificaciones(container) {
    // 1. Inyectamos la estructura HTML actualizada con un contenedor de alertas dinámico
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

            <!-- TEMAS BANCARIOS / ACCESO DIRECTO AL BANCO -->
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

        <!-- SECCIÓN DE NOTIFICACIONES DEL SISTEMA (EN TIEMPO REAL CON STREAMING) -->
        <div style="background: #ffffff; padding: 25px; border-radius: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.2rem;">🚨</span>
                    <h3 style="margin: 0; font-size: 1.2rem; color: #1f2937;">Notificaciones del sistema en vivo</h3>
                </div>
                <span id="estadoStreaming" style="font-size: 0.75rem; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 20px; font-weight: 600;">Conectando feed...</span>
            </div>
            <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 0.9rem;">Mantente al tanto de los incidentes y novedades en la red de transporte.</p>
         
            <!-- CONTENEDOR DE ALERTAS -->
            <div style="display: flex; flex-direction: column; gap: 12px; max-height: 500px; overflow-y: auto;" id="contenedorListaAlertas">
                <div style="padding: 15px; text-align: center; color: #9ca3af; font-size: 0.9rem;">
                    🔄 Esperando novedades de la red...
                </div>
            </div>
        </div>
    </div>

    <!-- ESTILOS DE ANIMACIÓN PARA LAS NUEVAS ALERTAS -->
    <style>
        @keyframes fadeInSlide {
            0% {
                opacity: 0;
                transform: translateY(-15px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .alerta-animada {
            animation: fadeInSlide 0.5s ease-out forwards;
        }
    </style>
`;

    // Configurar eventos del banco
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

    // 2. INICIAR LA CONEXIÓN DE STREAMING SSE CON EL BACKEND
    conectarStreamNotificaciones();
}

// Función que escucha el endpoint Server-Sent Events del backend
function conectarStreamNotificaciones() {
    const contenedorAlertas = document.getElementById('contenedorListaAlertas');
    const badgeEstado = document.getElementById('estadoStreaming');

    if (!contenedorAlertas) return;

    // Conectamos con el endpoint de Spring Boot que creamos
    const eventSource = new EventSource('http://localhost:8080/api/incidentes/stream');

    eventSource.addEventListener('open', () => {
        if (badgeEstado) {
            badgeEstado.innerText = "🟢 En directo";
            badgeEstado.style.background = "#dcfce7";
            badgeEstado.style.color = "#15803d";
        }
    });

    // 1. Cuando llegan los primeros elementos de golpe al abrir la vista
    eventSource.addEventListener('inicial', function(event) {
        const incidentes = JSON.parse(event.data);
        contenedorAlertas.innerHTML = ''; // Limpiamos el "Esperando..."

        incidentes.forEach(inc => {
            agregarNotificacionAlDOM(inc, false); // Carga inicial sin animación pesada
        });
    });

    // 2. Cuando llega un incidente nuevo de forma pausada cada X segundos
    eventSource.addEventListener('nuevo-incidente', function(event) {
        const incidente = JSON.parse(event.data);
        reproducirSonidoAlertaSuave(); // Opcional: un mini tono de aviso
        agregarNotificacionAlDOM(incidente, true); // Con animación de entrada
    });

    eventSource.onerror = function(error) {
        console.error("Conexión de streaming finalizada:", error);
        if (badgeEstado) {
            badgeEstado.innerText = "🔴 Desconectado";
            badgeEstado.style.background = "#fee2e2";
            badgeEstado.style.color = "#b91c1c";
        }
        eventSource.close();
    };
}

// Función auxiliar para pintar una tarjeta de alerta en el HTML
function agregarNotificacionAlDOM(incidente, conAnimacion) {
    const contenedorAlertas = document.getElementById('contenedorListaAlertas');
    if (!contenedorAlertas) return;

    const divItem = document.createElement('div');
    divItem.className = conAnimacion ? 'alerta-animada' : '';

    // Estilos limpios y profesionales para cada tarjeta
    divItem.style.cssText = `
        display: flex; 
        align-items: center; 
        justify-content: space-between; 
        padding: 14px 18px; 
        background: #f9fafb; 
        border-radius: 10px; 
        border-left: 4px solid ${incidente.afectacionTrafico ? '#ef4444' : '#3b82f6'};
        margin-bottom: 4px;
        transition: background 0.2s ease;
    `;

    divItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 1.4rem;">${incidente.afectacionTrafico ? '⚠️' : 'ℹ️'}</span>
            <div>
                <h4 style="margin: 0; font-size: 0.95rem; color: #111827;">${incidente.tipo} - ${incidente.ubicacionTexto || 'Zona general'}</h4>
                <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #4b5563;">${incidente.descripcion}</p>
                <span style="font-size: 0.75rem; color: #9ca3af;">Reportado recientemente • ${incidente.observacionesEmergencia || 'Sin novedades'}</span>
            </div>
        </div>
        <span style="color: #9ca3af; font-size: 1.2rem;">›</span>
    `;

    // Si es un incidente nuevo en tiempo real, lo colocamos arriba del todo
    if (conAnimacion) {
        contenedorAlertas.prepend(divItem);
    } else {
        contenedorAlertas.appendChild(divItem);
    }
}

// Función para obtener el clima real de Medellín[cite: 21]
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

// Gestión del Banco y Token recibido desde la tienda[cite: 21]
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

// Lógica del temporizador sincronizado[cite: 21]
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

// Reproductor de sonido nativo[cite: 21]
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

// Sonido más sutil para nuevas notificaciones en streaming
function reproducirSonidoAlertaSuave() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
        // Omitir si el navegador bloquea audio sin interacción previa
    }
}

// Escuchar cambios en el localStorage en tiempo real[cite: 21]
window.addEventListener('storage', (e) => {
    if (e.key === 'codigoConsignacionActivo') {
        cargarDatosBancariosUsuarioLogueado();
    }
});