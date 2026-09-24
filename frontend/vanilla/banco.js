// --- MÓDULO DE CONSULTA Y REDENCIÓN DE CÓDIGOS (DEPURADO) ---
document.addEventListener('DOMContentLoaded', () => {
    const btnConsultar = document.getElementById('btnConsultarCodigo');
    const inputCodigo = document.getElementById('inputCodigoRef');

    if (!btnConsultar || !inputCodigo) {
        console.warn("⚠️ Advertencia: No se encontró 'btnConsultarCodigo' o 'inputCodigoRef' en el HTML de esta página.");
        return;
    }

    btnConsultar.addEventListener('click', async () => {
        const codigoIngresado = inputCodigo.value.trim();
        console.log("🔍 Intentando validar código:", codigoIngresado);

        const ahora = Date.now();
        let controlIntentos = JSON.parse(localStorage.getItem('controlIntentosBanco')) || { intentos: [], bloqueoHasta: 0 };

        // 1. Verificar bloqueo de 1 minuto por superar 3 intentos
        if (ahora < controlIntentos.bloqueoHasta) {
            const segundosRestantes = Math.ceil((controlIntentos.bloqueoHasta - ahora) / 1000);
            alert(`⏳ Límite alcanzado. Debes esperar ${segundosRestantes} segundos para volver a enviar un código.`);
            return;
        }

        // 2. Filtrar intentos dentro de la ventana de 1 minuto (60000 ms)
        controlIntentos.intentos = controlIntentos.intentos.filter(timestamp => (ahora - timestamp) < 60000);

        // 3. Controlar máximo 3 intentos consecutivos por minuto
        if (controlIntentos.intentos.length >= 3) {
            controlIntentos.bloqueoHasta = ahora + 60000;
            localStorage.setItem('controlIntentosBanco', JSON.stringify(controlIntentos));
            alert("⚠️ Has superado el límite de 3 intentos por minuto. El sistema se ha bloqueado temporalmente por 1 minuto.");
            return;
        }

        controlIntentos.intentos.push(ahora);
        localStorage.setItem('controlIntentosBanco', JSON.stringify(controlIntentos));

        // 4. Validar el código guardado
        const tokenGuardado = JSON.parse(localStorage.getItem('codigoConsignacionActivo'));
        console.log("📦 Token guardado en localStorage:", tokenGuardado);

        if (!tokenGuardado || tokenGuardado.codigo !== codigoIngresado) {
            alert("❌ Código inválido. Asegúrate de generar y usar un código nuevo que no haya sido validado antes.");
            return;
        }

        if (ahora > tokenGuardado.expiracion) {
            alert("❌ El código temporal ha expirado. Genera uno nuevo.");
            return;
        }

        console.log("✅ Código validado correctamente. Procediendo a abonar $50,000 COP al backend...");

        // 5. Abonar los 50,000 COP obligatorios mediante el backend
        await aplicarAbonoPorCodigo(50000);

        // 6. Eliminar el código para que no se pueda repetir
        localStorage.removeItem('codigoConsignacionActivo');
    });
});

// Función auxiliar robusta conectada al MetodoPagoController
async function aplicarAbonoPorCodigo(montoAbonar) {
    const correoUsuario = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');
    console.log("📧 Correo detectado para el abono:", correoUsuario);

    try {
        const responseTarjetas = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correoUsuario)}`);
        if (!responseTarjetas.ok) {
            alert("⚠️ No se encontró ninguna tarjeta activa en el servidor para realizar el abono.");
            return;
        }
        const tarjetas = await responseTarjetas.json();
        if (!tarjetas || tarjetas.length === 0) {
            alert("⚠️ El usuario no tiene tarjetas registradas en la base de datos.");
            return;
        }

        const tarjetaObjetivo = tarjetas[0];
        console.log("💳 Tarjeta seleccionada para recibir el abono:", tarjetaObjetivo);

        const urlPeticion = `http://localhost:8080/api/pagos/actualizar-saldo?correo=${encodeURIComponent(correoUsuario)}&tipo=${encodeURIComponent(tarjetaObjetivo.tipo)}&monto=${montoAbonar}&esGasto=false`;
        console.log("🚀 Enviando POST a:", urlPeticion);

        const responseActualizar = await fetch(urlPeticion, { method: 'POST' });

        if (responseActualizar.ok) {
            const dataActualizada = await responseActualizar.json();
            console.log("🎉 Respuesta exitosa del servidor:", dataActualizada);
            alert(`🎉 ¡Éxito! Se han acreditado $${montoAbonar.toLocaleString()} COP a tu cuenta de ${dataActualizada.tipo}.\nNuevo saldo: $${dataActualizada.saldo.toLocaleString()} COP`);
            window.location.reload();
        } else {
            const mensajeError = await responseActualizar.text();
            console.error("❌ Error devuelto por el backend:", mensajeError);
            alert(`❌ Error al actualizar el saldo: ${mensajeError}`);
        }
    } catch (e) {
        console.error("❌ Error crítico de red con el backend:", e);
        alert("⚠️ Error de conexión con el servidor de pagos.");
    }
}