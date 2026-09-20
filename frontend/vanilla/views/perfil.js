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
              
               <!-- Tarjeta 1: Información Personal (con foto y datos) -->
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
               <div class="card perfil-card">
                   <div class="card-header-row">
                       <h3 class="card-title">Historial de rutas</h3>
                       <span class="card-arrow">&gt;</span>
                   </div>
                   <div id="infoHistorial" class="perfil-history-list">
                       <p class="backend-waiting-text">Sin rutas recientes...</p>
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
   `;

    // 1. LLAMAMOS A LA FUNCIÓN AQUÍ PARA QUE HAGA EL FETCH AUTOMÁTICAMENTE
    cargarDatosPerfil();

    // Conexión lógica para el botón de edición
    const btnEditar = document.getElementById('btnEditarPerfilGlobal');
    if (btnEditar) {
        btnEditar.addEventListener('click', () => {
            console.log("Solicitando edición de perfil para sincronizar con Spring Boot...");
            alert("Función de edición conectada con el flujo modular.");
        });
    }
}

async function cargarDatosPerfil() {
    // Recuperamos el correo del usuario logueado.
    // IMPORTANTE: Asegúrate de hacer localStorage.setItem('correoUsuario', correo) cuando el usuario haga login exitoso.
    const correoUsuario = localStorage.getItem('correoUsuario') || 'tucorreo@example.com';

    try {
        // Hacemos la petición real al endpoint que creamos en UsuarioController
        const response = await fetch(`http://localhost:8080/api/usuarios/perfil/${correoUsuario}`);

        if (!response.ok) {
            throw new Error('No se pudo obtener la información del perfil del backend');
        }

        const perfil = await response.json();

        // Pintamos los datos reales que devuelve Java en los elementos del DOM
        document.getElementById('infoNombre').textContent = perfil.nombre || 'Sin nombre';
        document.getElementById('infoEmail').textContent = perfil.email || 'Sin correo';
        document.getElementById('infoCiudad').textContent = perfil.ciudad || 'Medellín';

        // Manejo de preferencias de transporte
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