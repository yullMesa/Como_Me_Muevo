// --- MÓDULO DE TRANSFERENCIAS ENTRE CUENTAS ---
document.addEventListener('DOMContentLoaded', async () => {
    const selectOrigen = document.getElementById('selectOrigen');
    const selectDestino = document.getElementById('selectDestino');
    const formTransferencia = document.getElementById('formTransferencia');
    const correoUsuario = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');

    let misTarjetas = [];

    // 1. Cargar las tarjetas del usuario desde el backend al iniciar la vista
    if (correoUsuario && selectOrigen && selectDestino) {
        try {
            const response = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(correoUsuario)}`);
            if (response.ok) {
                misTarjetas = await response.json();

                selectOrigen.innerHTML = '<option value="">Selecciona origen...</option>';
                selectDestino.innerHTML = '<option value="">Selecciona destino...</option>';

                misTarjetas.forEach(t => {
                    const optionText = `${t.tipo} (${t.numeroTarjeta}) - Saldo: $${t.saldo.toLocaleString()}`;
                    selectOrigen.innerHTML += `<option value="${t.numeroTarjeta}">${optionText}</option>`;
                    selectDestino.innerHTML += `<option value="${t.numeroTarjeta}">${optionText}</option>`;
                });
            } else {
                selectOrigen.innerHTML = '<option value="">No se encontraron cuentas</option>';
                selectDestino.innerHTML = '<option value="">No se encontraron cuentas</option>';
            }
        } catch (e) {
            console.error("Error al cargar tarjetas para transferencias", e);
        }
    }

    // 2. Manejar el evento de enviar el formulario de transferencia
    if (formTransferencia) {
        formTransferencia.addEventListener('submit', async (e) => {
            e.preventDefault();

            const numOrigen = selectOrigen.value;
            const numDestino = selectDestino.value;
            const monto = parseFloat(document.getElementById('inputMontoTransferencia').value);

            // RESTRICCIÓN: No transferir al mismo producto / número de tarjeta
            if (numOrigen === numDestino) {
                alert("⚠️ Restricción aplicada: No puedes transferir fondos a la misma cuenta o producto de origen.");
                return;
            }

            const tarjetaOrigen = misTarjetas.find(t => t.numeroTarjeta === numOrigen);
            const tarjetaDestino = misTarjetas.find(t => t.numeroTarjeta === numDestino);

            if (!tarjetaOrigen || !tarjetaDestino) {
                alert("⚠️ Selecciona cuentas válidas.");
                return;
            }

            // VALIDACIÓN: Saldo suficiente (si no es crédito)
            if (tarjetaOrigen.tipo.toLowerCase() !== 'crédito' && tarjetaOrigen.saldo < monto) {
                alert(`❌ Fondos insuficientes. Tu cuenta de ${tarjetaOrigen.tipo} tiene un saldo de $${tarjetaOrigen.saldo.toLocaleString()} COP.`);
                return;
            }

            if (isNaN(monto) || monto <= 0) {
                alert("⚠️ Ingresa un monto válido mayor a 0.");
                return;
            }

            try {
                // Realizar retiro en el origen (esGasto = true)
                const resOrigen = await fetch(`http://localhost:8080/api/pagos/actualizar-saldo?correo=${encodeURIComponent(correoUsuario)}&numeroTarjeta=${encodeURIComponent(numOrigen)}&monto=${monto}&esGasto=true`, {
                    method: 'POST'
                });

                if (!resOrigen.ok) {
                    const errorMsg = await resOrigen.text();
                    alert(`❌ Error en cuenta origen: ${errorMsg}`);
                    return;
                }

                // Realizar consignación en el destino (esGasto = false)
                const resDestino = await fetch(`http://localhost:8080/api/pagos/actualizar-saldo?correo=${encodeURIComponent(correoUsuario)}&numeroTarjeta=${encodeURIComponent(numDestino)}&monto=${monto}&esGasto=false`, {
                    method: 'POST'
                });

                if (!resDestino.ok) {
                    alert("⚠️ Advertencia: Se debitó el origen pero hubo un error acreditando el destino. Contacta soporte.");
                    return;
                }

                alert(`🎉 ¡Transferencia exitosa!\n\nSe transfirieron $${monto.toLocaleString()} COP de tu cuenta ${tarjetaOrigen.tipo} hacia tu cuenta ${tarjetaDestino.tipo}.`);
                window.location.reload(); // Recargar para ver los saldos frescos

            } catch (error) {
                console.error("Error en la transacción de transferencia", error);
                alert("⚠️ Error de conexión con el servidor al procesar la transferencia.");
            }
        });
    }
});