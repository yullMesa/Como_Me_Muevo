import { renderPerfil } from './views/perfil.js';
import { renderReportes } from './views/reportes.js';
import { renderInicio } from './views/inicio.js';
import { renderRutas } from './views/rutas.js';
import { renderHistorialRutas } from './views/HistorialRutas.js';

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
        'rutas': renderRutas,
        'rutas-realizadas': renderHistorialRutas
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
    // 🛒 LÓGICA DE LA VENTANA EMERGENTE DEL CARRITO
    const btnCarrito = document.getElementById('btnCarrito');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.getElementById('closeModal');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const itemList = document.getElementById('itemList');

    let carrito = [];

    if (btnCarrito && cartModal) {
        btnCarrito.addEventListener('click', () => {
            cartModal.classList.add('active');
        });
    }

    if (closeModal && cartModal) {
        closeModal.addEventListener('click', () => {
            cartModal.classList.remove('active');
        });
    }

    // Botones para agregar productos al carrito
    document.querySelectorAll('.btn-add-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));

            carrito.push({ name, price });
            actualizarCarritoUI();
        });
    });

    function actualizarCarritoUI() {
        cartCount.textContent = carrito.length;
        itemList.innerHTML = '';

        if (carrito.length === 0) {
            itemList.innerHTML = '<li>Tu carrito está vacío.</li>';
            cartTotal.textContent = '0';
            return;
        }

        let total = 0;
        carrito.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            itemList.appendChild(li);
        });
        cartTotal.textContent = total.toLocaleString();
    }

    // Simulación del pago con tarjeta
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (carrito.length === 0) {
                alert("El carrito está vacío. Agrega un producto para pagar.");
                return;
            }

            const numTarjeta = document.getElementById('numTarjeta').value;
            if (numTarjeta.length < 16) {
                alert("Por favor ingresa un número de tarjeta válido de 16 dígitos.");
                return;
            }

            alert("¡Transacción y pago con tarjeta exitosos! Gracias por tu compra.");
            carrito = [];
            actualizarCarritoUI();
            cartModal.classList.remove('active');
            checkoutForm.reset();
        });
    }
});