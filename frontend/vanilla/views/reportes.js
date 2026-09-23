export function renderReportes(container) {
    let currentStep = 1;

    // Objeto temporal para almacenar los datos de las 3 fases
    let formDataReporte = {
        tipo: '',
        ubicacionTexto: '',
        fecha: '',
        hora: '',
        descripcion: '',
        afectacionTrafico: '',
        observacionesEmergencia: ''
    };

    function actualizarVista() {
        container.innerHTML = `
           <div class="card" style="padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
               <h2 style="color: #333; margin-bottom: 5px;">Reportar accidente</h2>
               <p style="color: #666; margin-bottom: 25px; font-size: 14px;">Tu reporte nos ayuda a mejorar la seguridad vial</p>
              
               <!-- Stepper / Indicador de las 3 fases -->
               <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                   <div style="display: flex; align-items: center; gap: 8px;">
                       <span style="width: 28px; height: 28px; border-radius: 50%; background: ${currentStep >= 1 ? '#e63946' : '#ccc'}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">1</span>
                       <span style="font-weight: ${currentStep === 1 ? 'bold' : 'normal'}; color: ${currentStep >= 1 ? '#333' : '#888'};">Información</span>
                   </div>
                   <div style="flex-grow: 1; height: 2px; background: ${currentStep >= 2 ? '#e63946' : '#ddd'}; margin: 0 15px;"></div>
                   <div style="display: flex; align-items: center; gap: 8px;">
                       <span style="width: 28px; height: 28px; border-radius: 50%; background: ${currentStep >= 2 ? '#e63946' : '#ccc'}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">2</span>
                       <span style="font-weight: ${currentStep === 2 ? 'bold' : 'normal'}; color: ${currentStep >= 2 ? '#333' : '#888'};">Detalles</span>
                   </div>
                   <div style="flex-grow: 1; height: 2px; background: ${currentStep >= 3 ? '#e63946' : '#ddd'}; margin: 0 15px;"></div>
                   <div style="display: flex; align-items: center; gap: 8px;">
                       <span style="width: 28px; height: 28px; border-radius: 50%; background: ${currentStep >= 3 ? '#e63946' : '#ccc'}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">3</span>
                       <span style="font-weight: ${currentStep === 3 ? 'bold' : 'normal'}; color: ${currentStep >= 3 ? '#333' : '#888'};">Confirmación</span>
                   </div>
               </div>

               <form id="formReporte">
                   ${renderContenidoPaso()}
                  
                   <div style="display: flex; justify-content: space-between; margin-top: 25px;">
                       ${currentStep > 1 ? '<button type="button" id="btnAnterior" style="background: #f1f1f1; color: #333; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Anterior</button>' : '<div></div>'}
                       <button type="submit" id="btnSiguiente" style="background: #e63946; color: white; padding: 10px 25px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">${currentStep === 3 ? 'Enviar reporte' : 'Siguiente'}</button>
                   </div>
               </form>
           </div>
       `;

        // Manejo de eventos del formulario (Avanzar / Guardar)
        const form = document.getElementById('formReporte');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Capturamos los datos del paso actual antes de avanzar
            if (currentStep === 1) {
                formDataReporte.tipo = document.getElementById('repTipo').value;
                formDataReporte.ubicacionTexto = document.getElementById('repUbicacion').value;
                formDataReporte.fecha = document.getElementById('repFecha').value;
                formDataReporte.hora = document.getElementById('repHora').value;
                formDataReporte.descripcion = document.getElementById('repDescripcion').value;

                if (!formDataReporte.tipo || !formDataReporte.ubicacionTexto || !formDataReporte.descripcion) {
                    alert("Por favor completa los campos obligatorios del Paso 1.");
                    return;
                }
            } else if (currentStep === 2) {
                formDataReporte.afectacionTrafico = document.getElementById('repTrafico').value;
                formDataReporte.observacionesEmergencia = document.getElementById('repObservaciones').value;
            }

            if (currentStep < 3) {
                currentStep++;
                actualizarVista();
            } else {
                // PASO 3: Envío final al Backend Java vía Fetch
                const correoUsuario = localStorage.getItem('correoUsuario');

                const payloadFinal = {
                    correo: correoUsuario,
                    tipo: formDataReporte.tipo,
                    descripcion: formDataReporte.descripcion,
                    ubicacionTexto: formDataReporte.ubicacionTexto,
                    afectacionTrafico: formDataReporte.afectacionTrafico,
                    observacionesEmergencia: formDataReporte.observacionesEmergencia
                };

                try {
                    const btnSubmit = document.getElementById('btnSiguiente');
                    btnSubmit.disabled = true;
                    btnSubmit.textContent = "Enviando...";

                    const response = await fetch('http://localhost:8080/api/incidentes/crear', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payloadFinal)
                    });

                    const resultado = await response.json();

                    if (response.ok) {
                        alert("¡Reporte enviado con éxito y guardado en la base de datos!");
                        currentStep = 1;
                        formDataReporte = { tipo: '', ubicacionTexto: '', fecha: '', hora: '', descripcion: '', afectacionTrafico: '', observacionesEmergencia: '' };
                        actualizarVista();
                    } else {
                        alert("Error al guardar: " + (resultado.error || "Desconocido"));
                        btnSubmit.disabled = false;
                        btnSubmit.textContent = "Enviar reporte";
                    }
                } catch (error) {
                    console.error("Error de conexión:", error);
                    alert("No se pudo conectar con el servidor backend.");
                    const btnSubmit = document.getElementById('btnSiguiente');
                    if(btnSubmit) {
                        btnSubmit.disabled = false;
                        btnSubmit.textContent = "Enviar reporte";
                    }
                }
            }
        });

        // Evento para retroceder de fase
        const btnAnterior = document.getElementById('btnAnterior');
        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    actualizarVista();
                }
            });
        }
    }

    function renderContenidoPaso() {
        if (currentStep === 1) {
            return `
               <div style="margin-bottom: 20px;">
                   <label style="font-weight: 600; font-size: 14px; color: #333;">Tipo de accidente</label><br>
                   <select id="repTipo" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 6px; background: white;">
                       <option value="">Selecciona una opción</option>
                       <option value="colision" ${formDataReporte.tipo === 'colision' ? 'selected' : ''}>Colisión vehicular</option>
                       <option value="atropello" ${formDataReporte.tipo === 'atropello' ? 'selected' : ''}>Atropello</option>
                       <option value="caida" ${formDataReporte.tipo === 'caida' ? 'selected' : ''}>Caída en transporte público</option>
                       <option value="otro" ${formDataReporte.tipo === 'otro' ? 'selected' : ''}>Otro</option>
                   </select>
               </div>
               <div style="margin-bottom: 20px;">
                   <label style="font-weight: 600; font-size: 14px; color: #333;">Ubicación del accidente</label><br>
                   <div style="position: relative; margin-top: 5px;">
                       <input type="text" id="repUbicacion" value="${formDataReporte.ubicacionTexto}" placeholder="Buscar en el mapa o ingresar dirección" style="width: 100%; padding: 10px 40px 10px 10px; border: 1px solid #ccc; border-radius: 6px;" />
                       <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer;">📍</span>
                   </div>
               </div>
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                   <div>
                       <label style="font-weight: 600; font-size: 14px; color: #333;">Fecha</label><br>
                       <input type="date" id="repFecha" value="${formDataReporte.fecha}" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 6px;" />
                   </div>
                   <div>
                       <label style="font-weight: 600; font-size: 14px; color: #333;">Hora</label><br>
                       <input type="time" id="repHora" value="${formDataReporte.hora}" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 6px;" />
                   </div>
               </div>
               <div style="margin-bottom: 20px;">
                   <label style="font-weight: 600; font-size: 14px; color: #333;">Descripción</label><br>
                   <textarea id="repDescripcion" rows="4" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 6px;" placeholder="Cuéntanos qué ocurrió...">${formDataReporte.descripcion}</textarea>
               </div>
           `;
        } else if (currentStep === 2) {
            return `
               <div style="margin-bottom: 20px; padding: 10px 0;">
                   <h3 style="color: #333; margin-bottom: 10px; font-size: 16px;">Detalles adicionales de la vía</h3>
                   <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Proporciona información complementaria sobre el estado del tráfico o servicios de emergencia.</p>
                  
                   <div style="margin-bottom: 15px;">
                       <label style="font-weight: 600; font-size: 14px; color: #333;">Afectación del tráfico</label><br>
                       <select id="repTrafico" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 6px; background: white;">
                           <option ${formDataReporte.afectacionTrafico === 'Tránsito fluido' ? 'selected' : ''}>Tránsito fluido</option>
                           <option ${formDataReporte.afectacionTrafico === 'Tránsito lento / Parcial' ? 'selected' : ''}>Tránsito lento / Parcial</option>
                           <option ${formDataReporte.afectacionTrafico === 'Vía totalmente bloqueada' ? 'selected' : ''}>Vía totalmente bloqueada</option>
                       </select>
                   </div>
                   <div style="margin-bottom: 15px;">
                       <label style="font-weight: 600; font-size: 14px; color: #333;">Observaciones de emergencia</label><br>
                       <textarea id="repObservaciones" rows="3" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 6px;" placeholder="Ej: Presencia de ambulancia, bomberos o policía...">${formDataReporte.observacionesEmergencia}</textarea>
                   </div>
               </div>
           `;
        } else {
            return `
               <div style="text-align: center; padding: 20px 0;">
                   <div style="font-size: 48px; margin-bottom: 10px;">📋</div>
                   <h3 style="color: #333; margin-bottom: 10px; font-size: 18px;">Confirmación final</h3>
                   <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Estás a un paso de enviar tu reporte a la red de movilidad. Verifica que todo esté correcto.</p>
                   <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; text-align: left; border: 1px solid #eaeaea; font-size: 14px; color: #444; max-width: 400px; margin: 0 auto;">
                       <p style="margin: 5px 0;"><b>Tipo:</b> ${formDataReporte.tipo}</p>
                       <p style="margin: 5px 0;"><b>Ubicación:</b> ${formDataReporte.ubicacionTexto}</p>
                       <p style="margin: 5px 0;"><b>Tráfico:</b> ${formDataReporte.afectacionTrafico || 'No especificado'}</p>
                   </div>
               </div>
           `;
        }
    }
    actualizarVista();
}