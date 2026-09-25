/**
 * Clase orientada a objetos para gestionar el Asistente Virtual tipo Chat Empresarial
 * Conectada al backend de Java para ejecutar operaciones reales sobre la Base de Datos.
 */
class BancoChatBot {
    constructor() {
        this.isOpen = false;
        this.correoUsuario = localStorage.getItem('userEmail') || localStorage.getItem('correoUsuario') || localStorage.getItem('correo');
        this.initElements();
        this.initEvents();
    }

    initElements() {
        this.btnToggle = document.getElementById('btnToggleChat');
        this.btnClose = document.getElementById('btnCloseChat');
        this.windowChat = document.getElementById('windowChat');
        this.chatBody = document.getElementById('chatBody');
        this.optionButtons = document.querySelectorAll('.option-btn');
    }

    initEvents() {
        if (this.btnToggle) {
            this.btnToggle.addEventListener('click', () => this.toggleChat());
        }
        if (this.btnClose) {
            this.btnClose.addEventListener('click', () => this.toggleChat());
        }
        this.optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleUserChoice(action);
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.windowChat.classList.remove('d-none');
            this.btnToggle.classList.add('d-none');
        } else {
            this.windowChat.classList.add('d-none');
            this.btnToggle.classList.remove('d-none');
        }
    }

    appendMessage(text, sender = 'bot') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `p-3 rounded-3 shadow-sm border ${
            sender === 'bot'
                ? 'bg-white text-dark align-self-start'
                : 'bg-primary text-white align-self-end'
        }`;
        messageDiv.style.maxWidth = '85%';
        messageDiv.innerHTML = text;
        this.chatBody.appendChild(messageDiv);
        this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }

    async handleUserChoice(action) {
        const actionNames = {
            consultar: "🔍 Revisar Saldo",
            leer: "📖 Mis Tarjetas",
            agregar: "➕ Agregar Tarjeta",
            actualizar: "✏️ Actualizar Saldo",
            eliminar: "🗑️ Eliminar Tarjeta",
            transferir: "💸 Enviar Dinero"
        };

        const selectedText = actionNames[action] || "Opción seleccionada";
        this.appendMessage(selectedText, 'user');

        if (!this.correoUsuario) {
            this.appendMessage("⚠️ No se encontró el correo en la sesión. Inicia sesión.", 'bot');
            return;
        }

        try {
            if (action === 'leer' || action === 'consultar') {
                const response = await fetch(`http://localhost:8080/api/pagos/tarjetas?correo=${encodeURIComponent(this.correoUsuario)}`);
                const data = await response.text();
                if (response.ok) {
                    const tarjetas = JSON.parse(data);
                    let mensaje = "📋 **Tus cuentas:**<br>";
                    tarjetas.forEach(t => {
                        mensaje += `- <b>${t.tipo}</b>: $${t.saldo.toLocaleString()} COP<br>`;
                    });
                    this.appendMessage(mensaje, 'bot');
                } else {
                    this.appendMessage(`⚠️ ${data}`, 'bot');
                }

            } else if (action === 'agregar') {
                const tipo = prompt("¿Qué tipo de tarjeta deseas? (Ahorros, Corriente, Crédito):", "Ahorros");
                if (!tipo) return;
                const response = await fetch(`http://localhost:8080/api/pagos/solicitar?correo=${encodeURIComponent(this.correoUsuario)}&tipo=${encodeURIComponent(tipo)}`, {
                    method: 'POST'
                });
                const resText = await response.text();
                this.appendMessage(response.ok ? `🎉 ${resText}` : `❌ ${resText}`, 'bot');

            } else if (action === 'actualizar') {
                // Aquí garantizamos que aparezca claramente Crédito, Ahorros o Corriente
                const tipo = prompt("Escribe el tipo de tarjeta a actualizar:\n- Ahorros\n- Corriente\n- Crédito", "Ahorros");
                if (!tipo) return;

                const monto = parseFloat(prompt("Ingresa el monto en COP:"));
                if (isNaN(monto) || monto <= 0) {
                    this.appendMessage("⚠️ El monto debe ser un valor positivo mayor a 0.", 'bot');
                    return;
                }

                const operacion = prompt("¿Qué deseas hacer? Escribe 'consignar' para sumar o 'gastar' para restar:", "consignar");
                if (!operacion) return;

                const esGasto = operacion.toLowerCase().includes('gastar');
                let cuotas = 1;

                // Si es tarjeta de crédito y es un gasto, pedimos las cuotas para calcular los intereses de la rúbrica (5.4)
                if (tipo.toLowerCase().includes('crédito') && esGasto) {
                    cuotas = parseInt(prompt("¿A cuántas cuotas? (<=2 sin intereses, 3-6: 1.9%, >=7: 2.3%):", "1")) || 1;
                }

                const response = await fetch(`http://localhost:8080/api/pagos/actualizar-saldo?correo=${encodeURIComponent(this.correoUsuario)}&tipo=${encodeURIComponent(tipo)}&monto=${monto}&esGasto=${esGasto}&cuotas=${cuotas}`, {
                    method: 'POST'
                });

                if (response.ok) {
                    const tarjetaActualizada = await response.json();
                    this.appendMessage(`✅ Saldo actualizado con éxito en <b>${tarjetaActualizada.tipo}</b>. Nuevo saldo: $${tarjetaActualizada.saldo.toLocaleString()} COP`, 'bot');
                } else {
                    const errorText = await response.text();
                    this.appendMessage(`❌ ${errorText}`, 'bot');
                }

            } else if (action === 'eliminar') {
                const tipoEliminar = prompt("Escribe el tipo de tarjeta que deseas eliminar (Ahorros, Corriente, Crédito):", "Ahorros");
                if (!tipoEliminar) return;
                const response = await fetch(`http://localhost:8080/api/pagos/eliminar-por-tipo?correo=${encodeURIComponent(this.correoUsuario)}&tipo=${encodeURIComponent(tipoEliminar)}`, {
                    method: 'DELETE'
                });
                const resText = await response.text();
                this.appendMessage(response.ok ? `🗑️ ${resText}` : `❌ ${resText}`, 'bot');

            } else if (action === 'transferir') {
                const tipoOrigen = prompt("¿Desde qué tarjeta deseas enviar? (Ahorros, Corriente, Crédito):", "Ahorros");
                if (!tipoOrigen) return;

                const correoDestino = prompt("Ingresa el correo electrónico del usuario destino:");
                if (!correoDestino || !correoDestino.includes('@')) {
                    this.appendMessage("⚠️ Debes ingresar un correo electrónico válido.", 'bot');
                    return;
                }

                const tipoDestino = prompt("¿A qué tipo de tarjeta del destinatario deseas abonar? (Ahorros, Corriente, Crédito):", "Ahorros");
                if (!tipoDestino) return;

                const monto = parseFloat(prompt("Ingresa el monto positivo a transferir en COP:"));
                if (isNaN(monto) || monto <= 0) {
                    this.appendMessage("❌ Error: El monto a transferir debe ser un número positivo mayor a 0.", 'bot');
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/pagos/transferir-externo?correoOrigen=${encodeURIComponent(this.correoUsuario)}&correoDestino=${encodeURIComponent(correoDestino)}&monto=${monto}&tipoOrigen=${encodeURIComponent(tipoOrigen)}&tipoDestino=${encodeURIComponent(tipoDestino)}`, {
                    method: 'POST'
                });

                const resText = await response.text();
                this.appendMessage(response.ok ? `✅ ${resText}` : `❌ ${resText}`, 'bot');
            }
        } catch (error) {
            console.error("Error:", error);
            this.appendMessage("⚠️ Error de conexión con el servidor Java.", 'bot');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.miAsistenteChat = new BancoChatBot();
});