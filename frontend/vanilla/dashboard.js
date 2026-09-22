import { renderPerfil } from './views/perfil.js';
import { renderReportes } from './views/reportes.js';
import { renderInicio } from './views/inicio.js';
import { renderRutas } from './views/rutas.js';

document.addEventListener('DOMContentLoaded', () => {
    // 🛡️ PASO DE SEGURIDAD: Verificamos si hay una sesión activa antes de cargar el panel
    const correoUsuario = localStorage.getItem('correoUsuario');
    if (!correoUsuario) {
        alert("Acceso denegado. Por favor inicia sesión.");
        window.location.href = '../pages/Login.html';
        return;
    }

    // 📌 Declaramos los elementos principales al inicio para evitar errores de referencia
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const contentArea = document.getElementById('contentArea');

    // Capturamos el botón de cerrar sesión
    const btnCerrarSesion = document.getElementById('btnLogout');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('correoUsuario');
            window.location.href = 'Login.html';
        });
    }

    // 📱 INTERACTIVIDAD DEL MENÚ HAMBURGUESA (RESPONSIVE)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Definición de rutas de la SPA
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

    // Carga por defecto la vista de inicio al entrar
    loadRoute('inicio');

    // Asignar eventos de clic a cada opción del menú lateral
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            const view = item.getAttribute('data-view');
            loadRoute(view);

            // Si está en pantalla pequeña, oculta el sidebar automáticamente al seleccionar una vista
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });
});