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

             <!-- Tarjeta de Banca y Tienda C.M.M. -->
             <div style="background: #ffffff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
                 <div>
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                         <span style="font-size: 0.8rem; font-weight: bold; color: #6b7280; text-transform: uppercase;">Finanzas y Tienda C.M.M.</span>
                         <a href="#" id="linkIrATienda" style="font-size: 0.8rem; color: #E21B23; text-decoration: none; font-weight: bold;">Ir a la tienda completa &gt;</a>
                     </div>
                     
                     <!-- Accesos rápidos financieros + mini destacados de tienda -->
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
                             <span style="font-size: 1.2rem; display: block; margin-bottom: 4px;">🛍️</span>
                             <span style="font-size: 0.7rem; color: #991b1b; font-weight: bold; display: block;">C.M.M. Store</span>
                         </div>
                     </div>
                 </div>

                 <div style="background: #fdf8f6; padding: 10px 14px; border-radius: 8px; margin-top: 15px; display: flex; justify-content: space-between; align-items: center; border: 1px dashed #fcd34d;">
                     <span style="font-size: 0.8rem; color: #92400e;">🎁 Producto destacado: <b>Cargar Cívica + Pasaje Estudiantil</b></span>
                     <button id="btnComprarRapidoInicio" style="background: #E21B23; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; cursor: pointer;">Comprar</button>
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

             <!-- Líneas de transporte -->
             <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; text-align: center;">
                 <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">
                     <span style="background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">A</span>
                     <p style="margin: 8px 0 2px 0; font-size: 0.8rem; font-weight: bold;">Línea A</p>
                     <span style="font-size: 0.7rem; color: #16a34a;">✔ Normal</span>
                 </div>
                 <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">
                     <span style="background: #dc2626; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">B</span>
                     <p style="margin: 8px 0 2px 0; font-size: 0.8rem; font-weight: bold;">Línea B</p>
                     <span style="font-size: 0.7rem; color: #16a34a;">✔ Normal</span>
                 </div>
                 <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">
                     <span style="background: #16a34a; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">L1</span>
                     <p style="margin: 8px 0 2px 0; font-size: 0.8rem; font-weight: bold;">Metrocable</p>
                     <span style="font-size: 0.7rem; color: #16a34a;">✔ Normal</span>
                 </div>
                 <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">
                     <span style="background: #ca8a04; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">L2</span>
                     <p style="margin: 8px 0 2px 0; font-size: 0.8rem; font-weight: bold;">Metrocable L2</p>
                     <span style="font-size: 0.7rem; color: #ca8a04;">⚠️ Retraso (8m)</span>
                 </div>
                 <div style="background: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #f3f4f6;">
                     <span style="background: #7c3aed; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">T</span>
                     <p style="margin: 8px 0 2px 0; font-size: 0.8rem; font-weight: bold;">Tranvía</p>
                     <span style="font-size: 0.7rem; color: #dc2626;">❌ Cerrada</span>
                 </div>
             </div>
         </div>

         <!-- SECCIÓN INFERIOR: Widgets de Acceso Dinámico (Sin duplicar menú lateral) -->
         <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
             
             <!-- Widget 1: Próximo Viaje / Ruta sugerida -->
             <div style="background: #ffffff; padding: 18px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
                 <div>
                     <span style="font-size: 0.8rem; font-weight: bold; color: #6b7280; text-transform: uppercase;">Próximo viaje</span>
                     <p style="margin: 10px 0 5px 0; font-size: 0.9rem; color: #111827; font-weight: bold;">Estación San Antonio ➔ Estación Alpujarra</p>
                     <p style="margin: 0; font-size: 0.8rem; color: #16a34a;">🕒 En 12 minutos</p>
                 </div>
                 <button id="btnVerRutasInicio" style="margin-top: 15px; background: #f3f4f6; color: #1f2937; border: 1px solid #d1d5db; padding: 8px; border-radius: 6px; font-size: 0.8rem; font-weight: bold; cursor: pointer; width: 100%;">Ver mis rutas</button>
             </div>

             <!-- Widget 2: Historial Reciente -->
             <div style="background: #ffffff; padding: 18px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
                 <div>
                     <span style="font-size: 0.8rem; font-weight: bold; color: #6b7280; text-transform: uppercase;">Últimos Trayectos</span>
                     <p style="margin: 10px 0 5px 0; font-size: 0.9rem; color: #111827; font-weight: bold;">Niquía ➔ Poblado</p>
                     <p style="margin: 0; font-size: 0.8rem; color: #6b7280;">🕒 35.5 mins • Hace poco</p>
                 </div>
                 <button id="btnVerHistorialInicio" style="margin-top: 15px; background: #f3f4f6; color: #1f2937; border: 1px solid #d1d5db; padding: 8px; border-radius: 6px; font-size: 0.8rem; font-weight: bold; cursor: pointer; width: 100%;">Ver historial completo</button>
             </div>

             <!-- Widget 3: Estado de Reportes -->
             <div style="background: #ffffff; padding: 18px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e5e7eb; display: flex; flex-direction: column; justify-content: space-between;">
                 <div>
                     <span style="font-size: 0.8rem; font-weight: bold; color: #6b7280; text-transform: uppercase;">Mis reportes activos</span>
                     <p style="margin: 10px 0 5px 0; font-size: 0.9rem; color: #111827; font-weight: bold;">2 reportes de tráfico enviados</p>
                     <p style="margin: 0; font-size: 0.8rem; color: #2563eb;">⚡ Verificados por la comunidad</p>
                 </div>
                 <button id="btnVerReportesInicio" style="margin-top: 15px; background: #f3f4f6; color: #1f2937; border: 1px solid #d1d5db; padding: 8px; border-radius: 6px; font-size: 0.8rem; font-weight: bold; cursor: pointer; width: 100%;">Gestionar reportes</button>
             </div>

         </div>

     </div>
   `;

    // Enlazar eventos de redirección sincronizados con el menú lateral de la SPA
    configurarEventosInicio();
}

function configurarEventosInicio() {
    // Redirigir a la tienda
    const linkTienda = document.getElementById('linkIrATienda');
    const btnComprar = document.getElementById('btnComprarRapidoInicio');

    const navegarATienda = (e) => {
        e.preventDefault();
        const menuTienda = document.querySelector('.sidebar-nav .nav-item[data-view="tienda"]') || document.querySelector('[data-view="store"]');
        if (menuTienda) menuTienda.click();
    };

    if (linkTienda) linkTienda.addEventListener('click', navegarATienda);
    if (btnComprar) btnComprar.addEventListener('click', navegarATienda);

    // Redirigir a rutas
    document.getElementById('btnVerRutasInicio')?.addEventListener('click', () => {
        document.querySelector('.sidebar-nav .nav-item[data-view="rutas"]')?.click();
    });

    // Redirigir a historial
    document.getElementById('btnVerHistorialInicio')?.addEventListener('click', () => {
        document.querySelector('.sidebar-nav .nav-item[data-view="rutas-realizadas"]')?.click();
    });

    // Redirigir a reportes
    document.getElementById('btnVerReportesInicio')?.addEventListener('click', () => {
        document.querySelector('.sidebar-nav .nav-item[data-view="reportes"]')?.click();
    });
}