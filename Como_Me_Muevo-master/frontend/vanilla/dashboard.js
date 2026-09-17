import { renderPerfil } from './views/perfil.js';
import { renderReportes } from './views/reportes.js';
import { renderInicio } from './views/inicio.js';

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const contentArea = document.getElementById('contentArea');

    const routes = {
        'inicio': renderInicio,
        'perfil': renderPerfil,
        'reportes': renderReportes
    };

    function loadRoute(viewName) {
        contentArea.innerHTML = ''; // Limpia la pantalla sin recargar la página
        if (routes[viewName]) {
            routes[viewName](contentArea); // Ejecuta el render del módulo
        } else {
            contentArea.innerHTML = `<h2>Vista en construcción</h2>`;
        }
    }

    loadRoute('inicio');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Evita la recarga de la página (clave para la SPA)
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            const view = item.getAttribute('data-view');
            loadRoute(view);
        });
    });
});