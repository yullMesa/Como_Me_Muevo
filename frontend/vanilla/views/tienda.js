import { Warehouse } from '../Warehouse.js';

let productoActual = null;
const correoUsuarioActual = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gridProductos');
    const menuItems = document.querySelectorAll('.store-nav-item');

    if (!correoUsuarioActual) {
        alert("⚠️ Acceso restringido. Debe iniciar sesión con su cuenta para acceder a la tienda y pasarela de pagos.");
        window.location.href = 'Login.html';
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
                abrirFlujoConAnimacionPalpitante();
            });
        });
    }

    // 1. Pantalla de carga con la animación palpitante
    async function abrirFlujoConAnimacionPalpitante() {
        let modal = document.getElementById('modalPago');

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modalPago';
            modal.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:1000; justify-content:center; align-items:center;";
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
           <style>
               @keyframes latidoPagoPro {
                   0% { transform: scale(1); opacity: 0.85; }
                   50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 20px rgba(226,27,35,0.7)); }
                   100% { transform: scale(1); opacity: 0.85; }
               }
           </style>
           <div style="background:#1f2937; color:#fff; width:440px; padding:40px; border-radius:20px; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.7); font-family:sans-serif; border:1px solid #374151;">
               <div style="animation: latidoPagoPro 1.8s infinite ease-in-out; display:inline-block; margin-bottom:18px;">
                   <img src="../Style/image/comopago.png" alt="Cómo pago" style="width:140px; height:140px; object-fit:contain; border-radius:50%;">
               </div>
               <h3 style="margin:0 0 8px 0; color:#f3f4f6; font-size:1.3rem;">Validando métodos de pago...</h3>
               <p style="margin:0; color:#9ca3af; font-size:0.9rem;">Consultando tus tarjetas en el servidor.</p>
           </div>
       `;
        modal.style.display = 'flex';

        try {
            const [response] = await Promise.all([
                fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correoUsuarioActual)}`),
                new Promise(resolve => setTimeout(resolve, 2500))
            ]);

            if (!response.ok) throw new Error("Error al conectar con el servidor.");

            const tarjetas = await response.json();
            renderizarVentanaDosColumnas(tarjetas);

        } catch (e) {
            console.error(e);
            modal.innerHTML = `
               <div style="background:#1f2937; color:#fff; width:400px; padding:30px; border-radius:16px; text-align:center; font-family:sans-serif;">
                   <h3 style="color:#f87171; margin-top:0;">⚠️ Error de Conexión</h3>
                   <p style="font-size:0.85rem; color:#9ca3af;">No se pudo comunicar con el backend de pagos.</p>
                   <button onclick="cerrarModalPago()" style="margin-top:15px; background:#374151; color:#fff; border:none; padding:8px 16px; border-radius:6px; cursor:pointer;">Cerrar</button>
               </div>
           `;
        }
    }

    // 2. Ventana de dos columnas con selector dinámico de tarjetas
    function renderizarVentanaDosColumnas(tarjetas) {
        const modal = document.getElementById('modalPago');
        window.listaTarjetasGlobal = tarjetas || [];

        modal.innerHTML = `
           <div style="background:#1f2937; color:#fff; width:780px; padding:25px; border-radius:14px; box-shadow:0 10px 25px rgba(0,0,0,0.4); position:relative; font-family:sans-serif;">
               <button onclick="cerrarModalPago()" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#9ca3af; font-size:1.2rem; cursor:pointer;">✕</button>
               <h2 style="margin-top:0; color:#f3f4f6; font-size:1.3rem; border-bottom:1px solid #374151; padding-bottom:10px;">Pasarela de Pago - C.M.M.</h2>
               
               <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
                   
                   <!-- COLUMNA IZQUIERDA: SELECCIÓN Y GESTIÓN DE TARJETAS -->
                   <div style="background:#111827; padding:18px; border-radius:10px; border:1px solid #374151; display:flex; flex-direction:column; justify-content:space-between;">
                       <div>
                           <h3 style="font-size:0.95rem; color:#e5e7eb; margin-top:0;">💳 Selecciona tu Tarjeta</h3>
                           
                           <div id="seccionSelectorTarjeta" style="margin-bottom:15px;">
                               <label style="font-size:0.8rem; display:block; margin-bottom:5px; color:#d1d5db;">Tarjetas asociadas:</label>
                               <select id="selectTarjetaUsuario" onchange="cambiarTarjetaSeleccionada()" style="width:100%; padding:8px; border-radius:6px; background:#374151; color:#fff; border:1px solid #4b5563; font-size:0.85rem;"></select>
                           </div>

                           <div id="detalleTarjetaActiva" style="background:#1f2937; padding:12px; border-radius:8px; border:1px solid #374151;"></div>
                       </div>

                       <div style="margin-top:15px; border-top:1px solid #374151; padding-top:12px;">
                           <details style="font-size:0.8rem; color:#9ca3af; cursor:pointer;">
                               <summary style="font-weight:bold; color:#f3f4f6; margin-bottom:5px;">➕ Solicitar nueva tarjeta</summary>
                               <div style="margin-top:8px;">
                                   <label style="display:block; margin-bottom:3px; color:#d1d5db;">Tipo:</label>
                                   <select id="selectNuevoTipoTarjeta" style="width:100%; padding:6px; border-radius:4px; background:#374151; color:#fff; border:1px solid #4b5563; margin-bottom:8px; font-size:0.8rem;">
                                       <option value="Ahorros">Ahorros</option>
                                       <option value="Corriente">Corriente</option>
                                       <option value="Crédito">Crédito</option>
                                   </select>
                                   <button onclick="solicitarTarjetaPropia()" style="width:100%; background:#E21B23; color:white; border:none; padding:6px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8rem;">Emitir Tarjeta</button>
                               </div>
                           </details>
                       </div>
                   </div>

                   <!-- COLUMNA DERECHA: RESUMEN Y ACCIÓN DE COMPRA -->
                   <div style="background:#111827; padding:18px; border-radius:10px; border:1px solid #374151; display:flex; flex-direction:column; justify-content:space-between;">
                       <div>
                           <h3 style="font-size:0.95rem; color:#e5e7eb; margin-top:0;">🛒 Resumen de Compra</h3>
                           <p style="margin:5px 0; font-size:0.9rem;"><strong id="lblProductoNombre">${productoActual.nombre}</strong></p>
                           <p style="margin:5px 0; font-size:1.1rem; color:#ef4444; font-weight:bold;" id="lblProductoPrecio">${productoActual.precioFormateado}</p>
                           <hr style="border-color:#374151; margin:15px 0;">
                           <div>
                               <p style="font-size:0.85rem; color:#9ca3af; margin:0;">Saldo / Cupo Disponible:</p>
                               <p style="font-size:1rem; color:#fff; font-weight:bold; margin:4px 0 0 0;" id="lblSaldoInfo">--</p>
                           </div>
                       </div>
                       <div id="contenedorBotonAccion" style="margin-top:15px;"></div>
                   </div>

               </div>
           </div>
       `;

        poblarSelectorTarjetas();
    }

    // Llena el selector con las tarjetas disponibles del usuario
    window.poblarSelectorTarjetas = function() {
        const tarjetas = window.listaTarjetasGlobal;
        const select = document.getElementById('selectTarjetaUsuario');
        const secSelector = document.getElementById('seccionSelectorTarjeta');

        if (!tarjetas || tarjetas.length === 0) {
            secSelector.style.display = 'none';
            document.getElementById('detalleTarjetaActiva').innerHTML = `<p style="font-size:0.85rem; color:#f87171; margin:0;">No tienes ninguna tarjeta activa. Usa la opción inferior para solicitar una.</p>`;
            document.getElementById('lblSaldoInfo').innerText = "$ 0 (Sin tarjeta)";
            document.getElementById('contenedorBotonAccion').innerHTML = `<p style="font-size:0.8rem; color:#9ca3af; text-align:center;">Solicita una tarjeta para continuar.</p>`;
            return;
        }

        secSelector.style.display = 'block';
        select.innerHTML = '';
        tarjetas.forEach((t, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = `${t.tipo} (${t.numeroTarjeta})`;
            select.appendChild(opt);
        });

        window.cambiarTarjetaSeleccionada();
    };

    // Cambia la tarjeta activa según la opción elegida en el desplegable
    window.cambiarTarjetaSeleccionada = function() {
        const tarjetas = window.listaTarjetasGlobal;
        const index = document.getElementById('selectTarjetaUsuario').value;
        const t = tarjetas[index];
        window.tarjetaActivaGlobal = t;

        document.getElementById('detalleTarjetaActiva').innerHTML = `
           <p style="margin:3px 0; font-size:0.85rem;"><strong>Tipo:</strong> ${t.tipo}</p>
           <p style="margin:3px 0; font-size:0.85rem;"><strong>Número:</strong> ${t.numeroTarjeta}</p>
           <p style="margin:3px 0; font-size:0.85rem; color:#34d399;"><strong>Estado:</strong> Activa</p>
       `;

        document.getElementById('lblSaldoInfo').innerText = `$ ${t.saldo.toLocaleString()}`;

        const contAccion = document.getElementById('contenedorBotonAccion');
        if (t.saldo < productoActual.precio) {
            contAccion.innerHTML = `
               <p style="font-size:0.75rem; color:#f87171; margin-bottom:8px;">⚠️ Saldo insuficiente.</p>
               <button onclick="pedirCodigoConsignacionBackend()" style="width:100%; background:#2563eb; color:white; border:none; padding:8px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:0.85rem;">Pedir código para consignar dinero</button>
           `;
        } else {
            contAccion.innerHTML = `
               <button onclick="ejecutarCompraValidada()" style="width:100%; background:#16a34a; color:white; border:none; padding:8px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:0.85rem;">Pagar ahora</button>
           `;
        }
    };

    window.solicitarTarjetaPropia = async function() {
        const tipoSeleccionado = document.getElementById('selectNuevoTipoTarjeta').value;
        try {
            const response = await fetch(`http://localhost:8080/api/pagos/solicitar?correo=${encodeURIComponent(correoUsuarioActual)}&tipo=${encodeURIComponent(tipoSeleccionado)}`, {
                method: 'POST'
            });
            if (response.ok) {
                alert(`🎉 ¡Tarjeta de ${tipoSeleccionado} generada y asociada exitosamente!`);
                abrirFlujoConAnimacionPalpitante();
            } else {
                alert(`⚠️ Restricción: No se pudo emitir la tarjeta (es posible que ya posea una del mismo tipo o aplique restricción de tiempo).`);
            }
        } catch (e) {
            alert("Error de red al solicitar la tarjeta.");
        }
    };

    window.pedirCodigoConsignacionBackend = function() {
        const tokenRef = `REF-CONSIGNACION-${Math.floor(100000 + Math.random() * 900000)}`;
        document.getElementById('contenedorBotonAccion').innerHTML = `
           <div style="background:#065f46; padding:10px; border-radius:6px; font-size:0.8rem; text-align:center;">
               <span style="display:block; color:#a7f3d0; margin-bottom:4px;">Código temporal (Expira en 3 min):</span>
               <strong style="font-family:monospace; font-size:0.95rem; color:#fff;">${tokenRef}</strong>
           </div>
       `;
    };

    window.ejecutarCompraValidada = function() {
        const t = window.tarjetaActivaGlobal;
        const precioProd = productoActual.precio;

        if (t.saldo < precioProd) {
            alert(`❌ Fondos insuficientes en la tarjeta seleccionada (${t.tipo}).`);
            return;
        }

        t.saldo -= precioProd;
        alert(`🚀 ¡Compra procesada con éxito!\nProducto: ${productoActual.nombre}\nDébitado de (${t.tipo}): ${productoActual.precioFormateado}\nNuevo saldo: $ ${t.saldo.toLocaleString()}`);
        cerrarModalPago();
    };

    window.cerrarModalPago = function() {
        const modal = document.getElementById('modalPago');
        if (modal) modal.style.display = 'none';
    };

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