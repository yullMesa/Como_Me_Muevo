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
                        <p id="infoEmail" class="info-value">Esperando al backend...</p>
                    </div>
                    <div>
                        <p class="info-label">Ciudad:</p>
                        <p id="infoCiudad" class="info-value">Esperando al backend...</p>
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
                            <span class="status-icon green">✔</span> <span>Sincronizando preferencias...</span>
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
                        <p class="backend-waiting-text">Esperando al backend para mostrar el historial...</p>
                    </div>
                </div>

                <!-- Tarjeta 4: Seguridad y privacidad -->
                <div class="card perfil-card">
                    <div class="card-header-row">
                        <h3 class="card-title">Seguridad y privacidad</h3>
                        <span class="card-arrow">&gt;</span>
                    </div>
                    <div id="infoSeguridad" class="perfil-security-list">
                        <p class="backend-waiting-text">Esperando al backend para verificar estado...</p>
                    </div>
                </div>

            </div>

            <!-- Botón global de acción -->
            <div class="perfil-actions">
                <button id="btnEditarPerfilGlobal" class="btn-editar-perfil">Editar perfil</button>
            </div>
        </div>
    `;

    // Conexión lógica preparada para cuando conectes tu API de Spring Boot
    const btnEditar = document.getElementById('btnEditarPerfilGlobal');
    if (btnEditar) {
        btnEditar.addEventListener('click', () => {
            console.log("Solicitando edición de perfil para sincronizar con Spring Boot...");
            alert("Función de edición conectada con el flujo modular.");
        });
    }
}