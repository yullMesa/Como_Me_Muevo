/**
 * Clase orientada a objetos para gestionar el Asistente Virtual tipo Chat Empresarial
 * Permite interactuar con las opciones del CRUD y consultas de tarjetas.
 */
class BancoChatBot {
    constructor() {
        this.isOpen = false;
        this.initElements();
        this.initEvents();
    }

    // Inicializa las referencias a los elementos del DOM del chat
    initElements() {
        this.btnToggle = document.getElementById('btnToggleChat');
        this.btnClose = document.getElementById('btnCloseChat');
        this.windowChat = document.getElementById('windowChat');
        this.chatBody = document.getElementById('chatBody');
        this.optionButtons = document.querySelectorAll('.option-btn');
    }

    // Configura los escuchadores de eventos (Event Listeners)
    initEvents() {
        if (this.btnToggle) {
            this.btnToggle.addEventListener('click', () => this.toggleChat());
        }
        if (this.btnClose) {
            this.btnClose.addEventListener('click', () => this.toggleChat());
        }

        // Registrar eventos para los botones de opciones rápidas del CRUD
        this.optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleUserChoice(action);
            });
        });
    }

    // Método para abrir o cerrar la ventana flotante del chat
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

    // Método encapsulado para añadir mensajes dinámicos al cuerpo del chat
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

    // Maneja la opción seleccionada por el usuario en el menú rápido del CRUD
    handleUserChoice(action) {
        const actionNames = {
            consultar: "🔍 Revisar Saldo",
            leer: "📖 Mis Tarjetas (Leer)",
            agregar: "➕ Agregar Tarjeta",
            actualizar: "✏️ Actualizar Tarjeta",
            eliminar: "🗑️ Eliminar Tarjeta"
        };

        // 1. Mostrar la burbuja con la opción elegida por el usuario
        const selectedText = actionNames[action] || "Opción seleccionada";
        this.appendMessage(selectedText, 'user');

        // 2. Simular respuesta del bot indicando que el endpoint de Java está en desarrollo
        setTimeout(() => {
            const genericMessage = `🛠️ Estamos construyendo y configurando el endpoint correspondiente en el backend de Java para procesar la función solicitada próximamente.`;
            this.appendMessage(genericMessage, 'bot');
        }, 500);
    }
}

// Inicializar el objeto del Chatbot al cargar completamente el DOM de la página
document.addEventListener('DOMContentLoaded', () => {
    window.miAsistenteChat = new BancoChatBot();
});