document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const contentArea = document.getElementById('contentArea');
    // Simulación o enlace futuro con el usuario autenticado
    const spanNombreUsuario = document.getElementById('nombreUsuario');

    // Plantilla limpia para las vistas de la SPA
    const views = {
        'inicio': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">¡Bienvenido al sistema!</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `,
        'rutas': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">Mis Rutas</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `,
        'viajes': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">Rutas Realizadas</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `,
        'reportes': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">Reportes</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `,
        'mis-reportes': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">Mis Reportes</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `,
        'notificaciones': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">Notificaciones</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `,
        'perfil': `
            <div class="card" style="text-align: center; padding: 60px 20px;">
                <h2 style="color: var(--rojo-principal); margin-bottom: 10px;">Perfil de Usuario</h2>
                <p style="color: var(--gris-oscuro); font-size: 1.1rem;">Aquí se irá construyendo el futuro de la app.</p>
            </div>
        `
    };

    function loadView(viewName) {
        if (views[viewName]) {
            contentArea.innerHTML = views[viewName];
        } else {
            contentArea.innerHTML = `<h2>Vista en construcción</h2>`;
        }
    }

    // Cargar la vista inicial por defecto
    loadView('inicio');

    // Manejar clics en el menú lateral de forma fluida (SPA)
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const view = item.getAttribute('data-view');
            loadView(view);
        });
    });
});