import { productos } from '../../Style/data/productos.js';

export function renderInicio(container) {
    container.innerHTML = `
 <div class="inicio-wrapper" style="font-family: sans-serif; color: #1f2937; padding-bottom: 40px;">
 
     <!-- Cabecera de Bienvenida -->
     <div style="margin-bottom: 25px;">
         <h2 style="margin: 0 0 5px 0; font-size: 1.6rem; color: #111827;">¡Bienvenido a ¿Cómo me muevo?!</h2>
         <p style="margin: 0; color: #6b7280; font-size: 0.95rem;">Aquí tienes un resumen de tu movilidad, el estado del servicio y lo que necesitas para moverte por Medellín.</p>
     </div>

     <!-- SECCIÓN SUPERIOR: Clima y Temas Bancarios / Tienda -->
     <div style="display: grid; grid-template-columns: 1fr 1.8fr; gap: 20px; margin-bottom: 25px;">
     
         <!-- Tarjeta de Clima -->
         <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
             <div>
                 <span style="font-size: 0.8rem; font-weight: bold; color: #6b7280; text-transform: uppercase;">Clima en Medellín</span>
                 <div style="display: flex; align-items: center; gap: 15px; margin-top: 15px;">
                     <span style="font-size: 2.5rem;">⛅</span>
                     <div>
                         <h3 style="margin: 0; font-size: 1.8rem; color: #111827;">22°C</h3>
                         <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #4b5563;">Parcialmente nublado</p>
                     </div>
                 </div>
             </div>
             <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 0.8rem; color: #6b7280; border-top: 1px solid #f3f4f6; padding-top: 10px;">
                 <span>💧 Humedad: 68%</span>
                 <span>💨 Viento: 6 km/h</span>
             </div>
         </div>

         <!-- Tarjeta de Banca y Pagos -->
         <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
             <div>
                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                     <span style="font-size: 0.8rem; font-weight: bold; color: #6b7280; text-transform: uppercase;">Finanzas y Pagos</span>
                     <a href="#" id="linkIrATienda" style="font-size: 0.8rem; color: #E21B23; text-decoration: none; font-weight: bold;">Ir a la tienda completa &gt;</a>
                 </div>
             
                 <!-- Accesos rápidos financieros con tarjeta roja de pago -->
                 <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
                     <div style="background: #f9fafb; padding: 10px; border-radius: 8px; border: 1px solid #f3f4f6;">
                         <span style="font-size: 1.2rem; display: block; margin-bottom: 4px;">💳</span>
                         <span style="font-size: 0.7rem; color: #4b5563; font-weight: bold; display: block;">Tarjetas</span>
                     </div>
                     <div style="background: #f9fafb; padding: 10px; border-radius: 8px; border: 1px solid #f3f4f6;">
                         <span style="font-size: 1.2rem; display: block; margin-bottom: 4px;">🟢</span>
                         <span style="font-size: 0.7rem; color: #4b5563; font-weight: bold; display: block;">Nequi</span>
                     </div>
                     <div style="background: #f9fafb; padding: 10px; border-radius: 8px; border: 1px solid #f3f4f6;">
                         <span style="font-size: 1.2rem; display: block; margin-bottom: 4px;">🔴</span>
                         <span style="font-size: 0.7rem; color: #4b5563; font-weight: bold; display: block;">Daviplata</span>
                     </div>
                     <div style="background: #fdf2f2; padding: 10px; border-radius: 8px; border: 1px solid #fecaca;">
                         <img src="../Style/image/comopago.png" alt="Cómo Pago" style="width: 20px; height: 20px; object-fit: contain; display: block; margin: 0 auto 4px auto;">
                         <span style="font-size: 0.7rem; color: #991b1b; font-weight: bold; display: block;">Cómo Pago</span>
                     </div>
                 </div>
             </div>
             <div style="background: #fdf8f6; padding: 10px 14px; border-radius: 8px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; border: 1px dashed #fcd34d;">
                 <span style="font-size: 0.8rem; color: #92400e;">🎁 Producto destacado: <b>Cargar Cívica + Pasaje Estudiantil</b></span>
                 <button id="btnIrAlBanco" style="background: #E21B23; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; cursor: pointer;">Ir al banco</button>
             </div>
         </div>
     </div>

     <!-- SECCIÓN CENTRAL: Incidentes y Estado del Servicio -->
     <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; margin-bottom: 25px;">
         <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
             <div>
                 <h3 style="margin: 0; font-size: 1.1rem; color: #111827; display: flex; align-items: center; gap: 8px;">
                     <span style="color: #dc2626;">⚠️</span> Incidentes y estado del servicio
                 </h3>
                 <p style="margin: 2px 0 0 0; font-size: 0.85rem; color: #6b7280;">Mantente informado sobre novedades, retrasos y cierres en la red de transporte.</p>
             </div>
         </div>
         <!-- Líneas de transporte dinámicas por hora -->
         <div id="contenedorEstadoLineas" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; text-align: center;">
             <!-- Se inyecta automáticamente con JS -->
         </div>
     </div>

     <!-- SECCIÓN INFERIOR: Carrusel Dinámico (Izquierda) y Botón Palpitante (Derecha) -->
     <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; align-items: stretch;">
        
         <!-- Cuadro Izquierda: Carrusel Dinámico de Productos -->
         <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 160px;">
             <span style="font-size: 0.75rem; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 10px; align-self: flex-start;">🌟 Nuestros Productos</span>
             <div id="carruselProductosInicio" style="display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.5s ease;">
                 <img id="imgCarruselProducto" src="" alt="Producto" style="width: 60px; height: 60px; object-fit: contain; margin-bottom: 8px;">
                 <span id="nombreCarruselProducto" style="font-size: 0.95rem; font-weight: bold; color: #111827;">Cargando productos...</span>
             </div>
         </div>

         <!-- Cuadro Derecha: Botón Palpitante a la Tienda -->
         <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
             <style>
                 @keyframes latido {
                     0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(226, 27, 35, 0.4); }
                     70% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(226, 27, 35, 0); }
                     100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(226, 27, 35, 0); }
                 }
                 .btn-palpitante {
                     animation: latido 2s infinite ease-in-out;
                     background: #E21B23;
                     color: white;
                     border: none;
                     padding: 14px 24px;
                     border-radius: 50px;
                     font-size: 0.95rem;
                     font-weight: bold;
                     cursor: pointer;
                     width: 100%;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     gap: 8px;
                     transition: background 0.2s;
                 }
                 .btn-palpitante:hover {
                     background: #c8151c;
                 }
             </style>
             <span style="font-size: 0.75rem; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 12px;">¡Visita nuestra tienda!</span>
             <button id="btnIrTiendaPalpitante" class="btn-palpitante">
                 🛍️ Ir a la Tienda
             </button>
         </div>
     </div>
 </div>
`;
    calcularEstadoLineasPorHora();
    configurarEventosInicio();
    inicializarCarruselDinamico();
}

function calcularEstadoLineasPorHora() {
    const contenedor = document.getElementById('contenedorEstadoLineas');
    if (!contenedor) return;
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const lineas = [
        { nombre: "Línea A", codigo: "A", colorBadge: "#2563eb" },
        { nombre: "Línea B", codigo: "B", colorBadge: "#dc2626" },
        { nombre: "Metrocable", codigo: "L1", colorBadge: "#16a34a" },
        { nombre: "Metrocable L2", codigo: "L2", colorBadge: "#ca8a04" },
        { nombre: "Tranvía", codigo: "T", colorBadge: "#7c3aed" }
    ];
    const fueraDeServicio = hora < 7 || hora >= 20;
    const htmlLineas = lineas.map((linea, index) => {
        let estadoHTML = "";
        if (fueraDeServicio) {
            estadoHTML = `<span style="font-size: 0.7rem; color: #dc2626; font-weight: bold;">❌ Cerrada (Sin servicio)</span>`;
        } else {
            const semilla = hora + index;
            const aleatorio = Math.sin(semilla) * 10000;
            const valorFijo = aleatorio - Math.floor(aleatorio);
            if (valorFijo < 0.6) {
                estadoHTML = `<span style="font-size: 0.7rem; color: #16a34a; font-weight: bold;">✔ Normal</span>`;
            } else if (valorFijo < 0.85) {
                estadoHTML = `<span style="font-size: 0.7rem; color: #ca8a04; font-weight: bold;">⚠️ Retraso (10m)</span>`;
            } else {
                estadoHTML = `<span style="font-size: 0.7rem; color: #dc2626; font-weight: bold;">❌ Cerrada</span>`;
            }
        }
        return `
     <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">
         <span style="background: ${linea.colorBadge}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">${linea.codigo}</span>
         <p style="margin: 8px 0 2px 0; font-size: 0.8rem; font-weight: bold;">${linea.nombre}</p>
         ${estadoHTML}
     </div>
    `;
    }).join('');
    contenedor.innerHTML = htmlLineas;
}

function inicializarCarruselDinamico() {
    const imgEl = document.getElementById('imgCarruselProducto');
    const nombreEl = document.getElementById('nombreCarruselProducto');
    const contenedorCarrusel = document.getElementById('carruselProductosInicio');
    if (!imgEl || !nombreEl || !contenedorCarrusel) return;

    // Rutas corregidas con "../" para salir de pages/ y entrar a Style/image/
    const productosLocal = [
        { nombre: "Cargar Cívica + Pasaje Estudiantil", imagen: "../Style/image/comopago.png" },
        { nombre: "Cómo lo quiero - Tarjeta Principal", imagen: "../Style/image/comoloquiero.png" },
        { nombre: "Ilustración de Movilidad", imagen: "../Style/image/ilustracion.png" },
        { nombre: "Background de Ruta Interactiva", imagen: "../Style/image/background.jpg" }
    ];

    let indexActual = 0;
    const actualizarVistaProducto = () => {
        contenedorCarrusel.style.opacity = '0';
        setTimeout(() => {
            imgEl.src = productosLocal[indexActual].imagen;
            nombreEl.textContent = productosLocal[indexActual].nombre;
            contenedorCarrusel.style.opacity = '1';
        }, 300);
    };

    actualizarVistaProducto();
    setInterval(() => {
        if (!document.body.contains(imgEl)) return;
        indexActual = (indexActual + 1) % productosLocal.length;
        actualizarVistaProducto();
    }, 3500);
}

function configurarEventosInicio() {
    const linkTienda = document.getElementById('linkIrATienda');
    const btnIrAlBanco = document.getElementById('btnIrAlBanco');
    const btnIrTiendaPalpitante = document.getElementById('btnIrTiendaPalpitante');

    const navegarATienda = (e) => {
        e.preventDefault();
        window.location.href = 'tienda.html';
    };

    if (linkTienda) linkTienda.addEventListener('click', navegarATienda);
    if (btnIrTiendaPalpitante) btnIrTiendaPalpitante.addEventListener('click', navegarATienda);

    if (btnIrAlBanco) {
        btnIrAlBanco.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Banco.html';
        });
    }
}