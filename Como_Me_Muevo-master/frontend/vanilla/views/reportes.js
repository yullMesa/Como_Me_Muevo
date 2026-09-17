export function renderReportes(container) {
    container.innerHTML = `
        <div class="card" style="padding: 30px;">
            <h2 style="color: var(--rojo-principal, #e63946); margin-bottom: 20px;">Reportar Incidente o Accidente</h2>
            <form id="formReporte">
                <div style="margin-bottom: 15px;">
                    <label>Línea / Estación afectada:</label><br>
                    <input type="text" id="txtEstacion" placeholder="Ej: Estación San Antonio" style="width: 100%; padding: 8px; margin-top: 5px;" />
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Descripción del problema:</label><br>
                    <textarea id="txtDescripcion" rows="4" style="width: 100%; padding: 8px; margin-top: 5px;" placeholder="Detalla qué sucedió..."></textarea>
                </div>
                <button type="submit" style="background: #e63946; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Enviar Reporte</button>
            </form>
        </div>
    `;

    const form = document.getElementById('formReporte');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Reporte registrado con éxito para la comunidad");
    });
}