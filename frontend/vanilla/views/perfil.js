export function renderPerfil(container) {
    container.innerHTML = `
     <div class="perfil-wrapper">
         <!-- Cabecera de la sección -->
         <div class="perfil-header-section">
             <div>
                 <h2 class="perfil-title">Perfil del usuario</h2>
                 <p class="perfil-subtitle">Gestiona tu información y preferencias de movilidad.</p>
             </div>
         </div>
         <!-- Cuadrícula de 4 tarjetas -->
         <div class="perfil-grid">
          
             <!-- Tarjeta 1: Información Personal -->
             <div class="card perfil-card">
                 <div class="card-header-row">
                     <h3 class="card-title">Información personal</h3>
                     <span class="card-action-icon" title="Editar">📋</span>
                 </div>
                 <div class="perfil-user-info">
                     <div id="perfilAvatarContainer" class="perfil-avatar">
                         <span class="perfil-avatar-icon">👤</span>
                     </div>
                     <div>
                         <p class="info-label">Nombre:</p>
                         <p id="infoNombre" class="info-value">Cargando nombre...</p>
                     </div>
                 </div>
                 <div class="info-block">
                     <p class="info-label">E-mail:</p>
                     <p id="infoEmail" class="info-value">Cargando correo...</p>
                 </div>
                 <div>
                     <p class="info-label">Ciudad:</p>
                     <p id="infoCiudad" class="info-value">Medellín</p>
                 </div>
             </div>

             <!-- Tarjeta 2: Preferencias de transporte -->
             <div class="card perfil-card">
                 <div class="card-header-row">
                     <h3 class="card-title">Preferencias de transporte</h3>
                     <span class="card-action-icon" title="Editar">📋</span>
                 </div>
                 <div id="infoPreferencias" class="perfil-preferences-list">
                     <div class="preference-item">
                         <span class="status-icon green">✔</span> <span>Cargando preferencias...</span>
                     </div>
                 </div>
             </div>

             <!-- Tarjeta 3: Historial de rutas -->
             <div class="card perfil-card" id="cardHistorialRutas" style="cursor: pointer;" title="Haz clic para ver todo el historial">
                 <div class="card-header-row">
                     <h3 class="card-title">Historial de rutas</h3>
                     <span class="card-arrow">&gt;</span>
                 </div>
                 <div id="infoHistorial" class="perfil-history-list">
                     <p class="backend-waiting-text">Cargando rutas recientes...</p>
                 </div>
             </div>

             <!-- Tarjeta 4: Seguridad y privacidad -->
             <div class="card perfil-card">
                 <div class="card-header-row">
                     <h3 class="card-title">Seguridad y privacidad</h3>
                     <span class="card-arrow">&gt;</span>
                 </div>
                 <div id="infoSeguridad" class="perfil-security-list">
                     <p class="backend-waiting-text">Cuenta protegida con BCrypt</p>
                 </div>
             </div>
         </div>

         <!-- Botón global de acción -->
         <div class="perfil-actions">
             <button id="btnEditarPerfilGlobal" class="btn-editar-perfil">Editar perfil</button>
         </div>
     </div>

     <!-- VENTANA EMERGENTE (MODAL) DE EDICIÓN -->
     <div id="modalEditarPerfil" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1000; justify-content: center; align-items: center;">
         <div style="background: #ffffff; width: 850px; max-width: 90%; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); overflow: hidden; display: grid; grid-template-columns: 1fr 1fr;">
             
             <!-- IZQUIERDA: Datos Actuales -->
             <div style="background: #f9fafb; padding: 30px; border-right: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
                 <div>
                     <h3 style="margin-top: 0; color: #111827; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;"><span>📋</span> Datos Actuales</h3>
                     <p style="color: #6b7280; font-size: 0.85rem; margin-bottom: 25px;">Esta es la información registrada actualmente en tu cuenta.</p>
                     
                     <div style="margin-bottom: 15px;">
                         <span style="font-size: 0.75rem; color: #9ca3af; display: block; font-weight: bold;">NOMBRE ACTUAL</span>
                         <span id="modalCurrentNombre" style="font-size: 0.95rem; color: #374151; font-weight: 600;">Cargando...</span>
                     </div>
                     <div style="margin-bottom: 15px;">
                         <span style="font-size: 0.75rem; color: #9ca3af; display: block; font-weight: bold;">CORREO ACTUAL</span>
                         <span id="modalCurrentEmail" style="font-size: 0.95rem; color: #374151; font-weight: 600;">Cargando...</span>
                     </div>
                 </div>
                 <div>
                     <span style="font-size: 0.75rem; color: #ef4444; background: #fee2e2; padding: 6px 12px; border-radius: 6px; display: inline-block;">⚠️ Al cambiar el correo, tu sesión se actualizará.</span>
                 </div>
             </div>

             <!-- DERECHA: Opciones de modificación -->
             <div style="padding: 30px; display: flex; flex-direction: column; justify-content: space-between;">
                 <div>
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                         <h3 style="margin: 0; color: #111827; font-size: 1.2rem;">Modificar datos</h3>
                         <button id="btnCloseModal" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #6b7280;">✕</button>
                     </div>

                     <!-- Selector de qué desea cambiar -->
                     <div style="display: flex; gap: 8px; margin-bottom: 20px;">
                         <button class="tab-btn active-tab" data-target="formNombre" style="flex: 1; padding: 8px; font-size: 0.8rem; border: 1px solid #d1d5db; background: #f3f4f6; border-radius: 6px; cursor: pointer; font-weight: 600;">Nombre</button>
                         <button class="tab-btn" data-target="formCorreo" style="flex: 1; padding: 8px; font-size: 0.8rem; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-weight: 600;">Correo</button>
                         <button class="tab-btn" data-target="formPassword" style="flex: 1; padding: 8px; font-size: 0.8rem; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; cursor: pointer; font-weight: 600;">Contraseña</button>
                     </div>

                     <!-- Formulario Nombre -->
                     <div id="formNombre" class="update-form-section">
                         <label style="font-size: 0.8rem; color: #4b5563; display: block; margin-bottom: 5px;">Nuevo nombre:</label>
                         <input type="text" id="inputNuevoNombre" placeholder="Escribe tu nuevo nombre" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 15px; box-sizing: border-box;">
                         <button id="btnActualizarNombre" style="background: #E21B23; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600;">Actualizar Nombre</button>
                     </div>

                     <!-- Formulario Correo -->
                     <div id="formCorreo" class="update-form-section" style="display: none;">
                         <label style="font-size: 0.8rem; color: #4b5563; display: block; margin-bottom: 5px;">Nuevo correo electrónico:</label>
                         <input type="email" id="inputNuevoCorreo" placeholder="Escribe tu nuevo correo" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 15px; box-sizing: border-box;">
                         <button id="btnActualizarCorreo" style="background: #E21B23; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600;">Actualizar Correo</button>
                     </div>

                     <!-- Formulario Contraseña -->
                     <div id="formPassword" class="update-form-section" style="display: none;">
                         <label style="font-size: 0.8rem; color: #4b5563; display: block; margin-bottom: 5px;">Nueva contraseña:</label>
                         <input type="password" id="inputNuevaPassword" placeholder="Escribe tu nueva contraseña" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 15px; box-sizing: border-box;">
                         <button id="btnActualizarPassword" style="background: #E21B23; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600;">Actualizar Contraseña</button>
                     </div>
                 </div>

                 <div style="text-align: right; margin-top: 20px;">
                     <span id="modalStatusMsg" style="font-size: 0.8rem; font-weight: 600;"></span>
                 </div>
             </div>
         </div>
     </div>
 `;

    // Cargar datos y configurar eventos
    cargarDatosPerfil();
    cargarHistorialReducido();
    configurarModalEdicion();

    // Redirección al hacer clic en historial
    const cardHistorial = document.getElementById('cardHistorialRutas');
    if (cardHistorial) {
        cardHistorial.addEventListener('click', () => {
            const navItemHistorial = document.querySelector('.sidebar-nav .nav-item[data-view="rutas-realizadas"]');
            if (navItemHistorial) navItemHistorial.click();
        });
    }
}

// Lógica de apertura, pestañas y comunicación con Spring Boot para el Modal
function configurarModalEdicion() {
    const btnEditar = document.getElementById('btnEditarPerfilGlobal');
    const modal = document.getElementById('modalEditarPerfil');
    const btnClose = document.getElementById('btnCloseModal');

    if (btnEditar && modal) {
        btnEditar.addEventListener('click', () => {
            // Rellenar datos actuales en la parte izquierda del modal
            document.getElementById('modalCurrentNombre').textContent = document.getElementById('infoNombre').textContent;
            document.getElementById('modalCurrentEmail').textContent = document.getElementById('infoEmail').textContent;
            modal.style.display = 'flex';
        });
    }

    if (btnClose && modal) {
        btnClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Pestañas (Tabs) de selección
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.update-form-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.style.background = '#fff';
                t.style.borderColor = '#d1d5db';
            });
            tab.style.background = '#f3f4f6';
            tab.style.borderColor = '#9ca3af';

            const targetId = tab.getAttribute('data-target');
            sections.forEach(sec => {
                sec.style.display = sec.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Eventos de actualización individual
    configurarAccionActualizacion('btnActualizarNombre', 'nombre', 'inputNuevoNombre');
    configurarAccionActualizacion('btnActualizarCorreo', 'correo', 'inputNuevoCorreo', true);
    configurarAccionActualizacion('btnActualizarPassword', 'contrasena', 'inputNuevaPassword');
}

function configurarAccionActualizacion(buttonId, campoBackend, inputId, esCorreo = false) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const correoActual = localStorage.getItem('correoUsuario');
        const valorNuevo = document.getElementById(inputId).value.trim();
        const statusMsg = document.getElementById('modalStatusMsg');

        if (!valorNuevo) {
            statusMsg.style.color = '#b91c1c';
            statusMsg.textContent = "El campo no puede estar vacío.";
            return;
        }

        const payload = { correoActual };
        payload[campoBackend] = valorNuevo;

        try {
            statusMsg.style.color = '#0369a1';
            statusMsg.textContent = "Actualizando...";

            const response = await fetch('http://localhost:8080/api/usuarios/actualizar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                statusMsg.style.color = '#15803d';
                statusMsg.textContent = data.mensaje;

                if (esCorreo) {
                    localStorage.setItem('correoUsuario', data.nuevoCorreo);
                }

                setTimeout(() => {
                    document.getElementById('modalEditarPerfil').style.display = 'none';
                    cargarDatosPerfil(); // Recargar datos en la vista principal
                }, 1200);
            } else {
                statusMsg.style.color = '#b91c1c';
                statusMsg.textContent = data.error || "No se pudo actualizar.";
            }
        } catch (e) {
            console.error("Error al actualizar perfil:", e);
            statusMsg.style.color = '#b91c1c';
            statusMsg.textContent = "Error de conexión con el servidor.";
        }
    });
}

async function cargarDatosPerfil() {
    const correoUsuario = localStorage.getItem('correoUsuario');
    if (!correoUsuario) return;
    try {
        const response = await fetch(`http://localhost:8080/api/usuarios/perfil/${correoUsuario}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del perfil del backend');
        }
        const perfil = await response.json();
        document.getElementById('infoNombre').textContent = perfil.nombre || 'Sin nombre';
        document.getElementById('infoEmail').textContent = perfil.email || 'Sin correo';
        document.getElementById('infoCiudad').textContent = perfil.ciudad || 'Medellín';
        const contenedorPreferencias = document.getElementById('infoPreferencias');
        if (perfil.preferenciasTransporte && perfil.preferenciasTransporte.length > 0) {
            contenedorPreferencias.innerHTML = perfil.preferenciasTransporte.map(pref => `
             <div class="preference-item">
                 <span class="status-icon green">✔</span> <span>${pref}</span>
             </div>
         `).join('');
        } else {
            contenedorPreferencias.innerHTML = `
             <div class="preference-item">
                 <span class="status-icon green">✔</span> <span>Metro / Integrados</span>
             </div>
         `;
        }
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        document.getElementById('infoNombre').textContent = "Error de conexión";
        document.getElementById('infoEmail').textContent = "No se pudo conectar con Spring Boot";
    }
}

async function cargarHistorialReducido() {
    const correoUsuario = localStorage.getItem('correoUsuario');
    const contenedorHistorial = document.getElementById('infoHistorial');
    if (!correoUsuario || !contenedorHistorial) return;
    try {
        const response = await fetch(`http://localhost:8080/api/rutas/historial?correo=${correoUsuario}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
                contenedorHistorial.innerHTML = `<p class="backend-waiting-text">Sin rutas recientes...</p>`;
                return;
            }
            const ultimasRutas = data.slice(0, 3);
            contenedorHistorial.innerHTML = ultimasRutas.map(item => `
               <div style="font-size: 13px; padding: 4px 0; border-bottom: 1px solid #f0f0f0;">
                   <b>${item.ruta.origen} → ${item.ruta.destino}</b><br>
                   <span style="color: #666; font-size: 11px;">🕒 ${item.ruta.tiempoEstimado || 'N/A'} mins</span>
               </div>
           `).join('');
        } else {
            contenedorHistorial.innerHTML = `<p class="backend-waiting-text">No se pudo cargar el historial.</p>`;
        }
    } catch (error) {
        console.error("Error al obtener historial reducido:", error);
        contenedorHistorial.innerHTML = `<p class="backend-waiting-text">Error de conexión.</p>`;
    }
}