import { renderPerfil } from './views/perfil.js';
import { renderReportes } from './views/reportes.js';
import { renderInicio } from './views/inicio.js';
import { renderRutas } from './views/rutas.js';

document.addEventListener('DOMContentLoaded', () => {
    // 🛡️ PASO DE SEGURIDAD: Verificamos si hay una sesión activa antes de cargar el panel
    const correoUsuario = localStorage.getItem('correoUsuario');
    if (!correoUsuario) {
        alert("Acceso denegado. Por favor inicia sesión.");
        window.location.href = '../pages/Login.html'; // Ajusta la ruta si es necesario según dónde tengas el Login.html
        return; // Detenemos la ejecución del script
    }
    // Capturamos el botón de cerrar sesión
    const btnCerrarSesion = document.getElementById('btnLogout');

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault(); // Evitamos que recargue o navegue de inmediato sin limpiar

            // Borramos el rastro de la sesión actual
            localStorage.removeItem('correoUsuario');

            // Redirigimos manualmente al Login
            window.location.href = 'Login.html';
        });
    }

    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const contentArea = document.getElementById('contentArea');
    const routes = {
        'inicio': renderInicio,
        'perfil': renderPerfil,
        'reportes': renderReportes,
        'rutas': renderRutas
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