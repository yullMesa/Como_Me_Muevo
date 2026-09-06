export function renderPerfil(container) {
    container.innerHTML = `
        <div class="card" style="padding: 30px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="margin-bottom: 25px;">
                <h2 style="color: #e63946; margin-bottom: 5px; font-size: 1.5rem;">Perfil del usuario</h2>
                <p style="color: #6c757d; font-size: 0.95rem;">Gestiona tu información y preferencias de movilidad.</p>
            </div>

            <!-- Información Personal -->
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: #333; margin-bottom: 15px; border-bottom: 2px solid #f1f1f1; padding-bottom: 8px;">Información personal</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div>
                        <label style="font-size: 0.85rem; color: #6c757d; display: block; margin-bottom: 4px;">Nombre</label>
                        <input type="text" id="perfilNombre" value="Juan Pérez" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-size: 1rem;" />
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; color: #6c757d; display: block; margin-bottom: 4px;">E-mail</label>
                        <input type="email" id="perfilEmail" value="juan.perez@email.com" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-size: 1rem;" />
                    </div>
                    <div>
                        <label style="font-size: 0.85rem; color: #6c757d; display: block; margin-bottom: 4px;">Ciudad</label>
                        <input type="text" id="perfilCiudad" value="Medellín" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px; font-size: 1rem;" />
                    </div>
                </div>
            </div>

            <!-- Preferencias de Transporte -->
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 1.1rem; color: #333; margin-bottom: 15px; border-bottom: 2px solid #f1f1f1; padding-bottom: 8px;">Preferencias de transporte</h3>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <label style="background: #f8f9fa; padding: 10px 15px; border-radius: 6px; border: 1px solid #dee2e6; cursor: pointer;">
                        <input type="checkbox" checked style="margin-right: 8px;" /> Metro
                    </label>
                    <label style="background: #f8f9fa; padding: 10px 15px; border-radius: 6px; border: 1px solid #dee2e6; cursor: pointer;">
                        <input type="checkbox" checked style="margin-right: 8px;" /> Metrocable
                    </label>
                    <label style="background: #f8f9fa; padding: 10px 15px; border-radius: 6px; border: 1px solid #dee2e6; cursor: pointer;">
                        <input type="checkbox" checked style="margin-right: 8px;" /> Tranvía
                    </label>
                </div>
            </div>

            <!-- Botón de acción -->
            <div>
                <button id="btnGuardarPerfil" style="background: #e63946; color: white; padding: 12px 25px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Editar perfil</button>
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