import { Warehouse } from '../Warehouse.js';

let productoActual = null;

// Validamos estrictamente la sesión activa del usuario real
const correoUsuarioActual = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gridProductos');
    const menuItems = document.querySelectorAll('.store-nav-item');

    // Validación de seguridad al cargar la tienda
    if (!correoUsuarioActual) {
        alert("⚠️ Acceso restringido. Debe iniciar sesión con su cuenta para acceder a la tienda y pasarela de pagos.");
        window.location.href = 'Login.html'; // Redirección automática si no hay sesión
        return;
    }

    function renderizarProductos(categoria = 'todos') {
        const productos = Warehouse.obtenerProductos(categoria);
        grid.innerHTML = '';

        productos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-container">
                    <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'img-fallback\\'>${prod.fallbackIcon} ${prod.nombre}</div>';">
                </div>
                <div class="product-info">
                    <h3>${prod.nombre}</h3>
                    <p>${prod.descripcion}</p>
                    <span class="product-price">${prod.precioFormateado}</span>
                    <button class="btn-agregar-carrito" data-id="${prod.id}">🛒 Comprar ahora</button>
                </div>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                productoActual = Warehouse.productos.find(p => p.id === id);
                abrirFlujoPago();
            });
        });
    }

    async function abrirFlujoPago() {
        const modal = document.getElementById('modalPago');
        const estCargando = document.getElementById('estadoCargando');
        const estSinTarjetas = document.getElementById('estadoSinTarjetas');
        const estConTarjeta = document.getElementById('estadoConTarjeta');
        const btnCerrarC = document.getElementById('btnCerrarContenedor');

        modal.style.display = 'flex';
        estCargando.style.display = 'block';
        estSinTarjetas.style.display = 'none';
        estConTarjeta.style.display = 'none';
        btnCerrarC.style.display = 'none';

        try {
            // Consultamos al backend enviando estrictamente el correo de la sesión actual
            const response = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correoUsuarioActual)}`);

            if (response.status === 401 || response.status === 404) {
                setTimeout(() => {
                    estCargando.style.display = 'none';
                    alert("La sesión ha expirado o el usuario no está registrado. Inicie sesión nuevamente.");
                    window.location.href = 'Login.html';
                }, 1000);
                return;
            }

            const tarjetas = await response.json();

            setTimeout(() => {
                estCargando.style.display = 'none';

                if (!tarjetas || tarjetas.length === 0) {
                    estSinTarjetas.style.display = 'block';
                    btnCerrarC.style.display = 'block';
                } else {
                    const tarjetaActiva = tarjetas[0];
                    document.getElementById('lblProductoNombre').innerText = productoActual.nombre;
                    document.getElementById('lblProductoPrecio').innerText = productoActual.precioFormateado;
                    document.getElementById('lblTarjetaInfo').innerText = `${tarjetaActiva.tipo} (${tarjetaActiva.numeroTarjeta})`;
                    document.getElementById('lblSaldoInfo').innerText = `$ ${tarjetaActiva.saldo.toLocaleString()}`;

                    window.saldoActualTarjeta = tarjetaActiva.saldo;
                    estConTarjeta.style.display = 'block';
                }
            }, 1500);

        } catch (error) {
            console.error("Error de conexión:", error);
            estCargando.style.display = 'none';
            alert("Error de comunicación con el servidor de pagos.");
            cerrarModalPago();
        }
    }

    window.solicitarTarjetaPropia = async function() {
        try {
            const response = await fetch(`http://localhost:8080/api/pagos/solicitar?correo=${encodeURIComponent(correoUsuarioActual)}`, {
                method: 'POST'
            });
            if (response.ok) {
                alert("🎉 ¡Tarjeta generada y asociada exitosamente a su cuenta!");
                cerrarModalPago();
            } else {
                alert("No se pudo procesar la solicitud de la tarjeta.");
            }
        } catch (e) {
            alert("Error de red al solicitar la tarjeta.");
        }
    }

    window.ejecutarCompra = function() {
        if (window.saldoActualTarjeta < productoActual.precio) {
            let quiereRecargar = confirm(`❌ Saldo insuficiente en su cuenta.\nTienes: $ ${window.saldoActualTarjeta.toLocaleString()} y el producto vale ${productoActual.precioFormateado}.\n\n¿Desea recargar saldo ahora?`);

            if (quiereRecargar) {
                alert("Redirigiendo a pasarela de recargas...");
                window.saldoActualTarjeta = 50000;
                document.getElementById('lblSaldoInfo').innerText = `$ ${window.saldoActualTarjeta.toLocaleString()}`;
                alert("✅ ¡Recarga simulada con éxito! Nuevo saldo: $ 50.000. Ya puede comprar.");
            } else {
                cerrarModalPago();
            }
        } else {
            window.saldoActualTarjeta -= productoActual.precio;
            alert(`🚀 ¡Compra procesada con éxito para el usuario ${correoUsuarioActual}!\nProducto: ${productoActual.nombre}\nTotal: ${productoActual.precioFormateado}`);
            cerrarModalPago();
        }
    }

    window.cerrarModalPago = function() {
        document.getElementById('modalPago').style.display = 'none';
    }

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            menuItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            renderizarProductos(item.getAttribute('data-categoria'));
        });
    });

    renderizarProductos('todos');
});