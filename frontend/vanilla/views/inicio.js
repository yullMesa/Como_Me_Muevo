export function renderInicio(container) {
    container.innerHTML = `
        <div class="card" style="text-align: center; padding: 60px 20px;">
            <h2 style="color: var(--rojo-principal, #e63946); margin-bottom: 10px;">¡Bienvenido al sistema!</h2>
            <p style="color: #6c757d; font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app de transporte.</p>
        </div>
    `;
}