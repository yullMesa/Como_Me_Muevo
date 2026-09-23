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

              <!-- Tarjeta 3: Historial de rutas (Interactiva y con redirección) -->
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
  `;

    // 1. Llamamos a la función para cargar los datos del perfil y del historial
    cargarDatosPerfil();
    cargarHistorialReducido();

    // 2. Evento de redirección al hacer clic en la tarjeta de Historial de Rutas
    const cardHistorial = document.getElementById('cardHistorialRutas');
    if (cardHistorial) {
        cardHistorial.addEventListener('click', () => {
            // Buscamos el ítem del menú lateral correspondiente a "Rutas realizadas" y simula su clic para mantener la SPA sincronizada
            const navItemHistorial = document.querySelector('.sidebar-nav .nav-item[data-view="rutas-realizadas"]');
            if (navItemHistorial) {
                navItemHistorial.click();
            } else {
                // Plan B por si el selector varía: recarga manual de la vista mediante evento o recarga
                console.log("Redirigiendo a historial de rutas...");
            }
        });
    }

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

// Nueva función exclusiva para pintar las últimas 3 rutas en el Perfil
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

            // Tomamos únicamente las últimas 3 rutas usando .slice(0, 3)
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