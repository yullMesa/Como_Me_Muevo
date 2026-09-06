export function renderPerfil(container) {
    container.innerHTML = `
        <div class="perfil-container">
            <div class="perfil-header">
                <h2 class="perfil-title">Perfil del usuario</h2>
                <p class="perfil-subtitle">Gestiona tu información personal y preferencias de movilidad.</p>
            </div>

            <!-- Información Personal -->
            <div class="perfil-section">
                <h3 class="perfil-section-title">Información personal</h3>
                <div class="perfil-grid">
                    <div class="perfil-field">
                        <label class="perfil-label" for="perfilNombre">Nombre</label>
                        <input type="text" id="perfilNombre" class="perfil-input" value="Yull Sebastián" />
                    </div>
                    <div class="perfil-field">
                        <label class="perfil-label" for="perfilEmail">E-mail</label>
                        <input type="email" id="perfilEmail" class="perfil-input" value="yull.mesa@email.com" />
                    </div>
                    <div class="perfil-field">
                        <label class="perfil-label" for="perfilCiudad">Ciudad</label>
                        <input type="text" id="perfilCiudad" class="perfil-input" value="Medellín" />
                    </div>
                </div>
            </div>

            <!-- Preferencias de Transporte -->
            <div class="perfil-section">
                <h3 class="perfil-section-title">Preferencias de transporte</h3>
                <div class="perfil-checkbox-group">
                    <label class="perfil-checkbox-label">
                        <input type="checkbox" checked /> Metro
                    </label>
                    <label class="perfil-checkbox-label">
                        <input type="checkbox" checked /> Metrocable
                    </label>
                    <label class="perfil-checkbox-label">
                        <input type="checkbox" checked /> Tranvía
                    </label>
                </div>
            </div>

            <!-- Botón de acción -->
            <div class="perfil-btn-container">
                <button id="btnGuardarPerfil" class="perfil-btn-guardar">Guardar cambios</button>
            </div>
        </div>
    `;

    const btnGuardar = document.getElementById('btnGuardarPerfil');
    btnGuardar.addEventListener('click', () => {
        const nombre = document.getElementById('perfilNombre').value;
        const email = document.getElementById('perfilEmail').value;
        const ciudad = document.getElementById('perfilCiudad').value;

        console.log("Guardando datos de perfil:", { nombre, email, ciudad });
        alert("¡Perfil actualizado correctamente!");
    });
}