// Exponer la función al scope global para el callback de Google OAuth
window.handleCredentialResponse = async function(response) {
    const googleToken = response.credential;

    try {
        const res = await fetch('http://localhost:8080/api/usuarios/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: googleToken })
        });

        const resultado = await res.text();

        if (res.ok) {
            alert('¡Autenticación exitosa con Google!');
            window.location.href = 'Dashboard.html';
        } else {
            alert('Error en servidor: ' + resultado);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('No se pudo conectar con el servidor.');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    // Lógica para alternar la visibilidad de las contraseñas
    document.querySelectorAll(".toggle-password").forEach(toggle => {
        toggle.addEventListener("click", function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector("i");
            
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });
    });

    // Lógica para la validación de contraseña en TIEMPO REAL 

    const contrasenaInput = document.getElementById("contrasena");
    const confirmarInput = document.getElementById("confirmarContrasena");
    const feedbackContainer = document.getElementById("passwordFeedback");
    const matchFeedback = document.getElementById("matchFeedback");

    const reqLength = document.getElementById("reqLength");
    const reqUpper = document.getElementById("reqUpper");
    const reqLower = document.getElementById("reqLower");
    const reqNum = document.getElementById("reqNum");
    const reqSpecial = document.getElementById("reqSpecial");

    function validarRequisito(elemento, cumple, texto) {
        if (cumple) {
            elemento.style.color = "#28a745"; // Verde
            elemento.textContent = "✔ " + texto;
        } else {
            elemento.style.color = "#dc3545"; // Rojo
            elemento.textContent = "✖ " + texto;
        }
    }

    contrasenaInput.addEventListener("input", function () {
        const val = contrasenaInput.value;
        feedbackContainer.style.display = val.length > 0 ? "block" : "none";

        validarRequisito(reqLength, val.length >= 8, "Mínimo 8 caracteres");
        validarRequisito(reqUpper, /[A-Z]/.test(val), "Al menos una letra mayúscula");
        validarRequisito(reqLower, /[a-z]/.test(val), "Al menos una letra minúscula");
        validarRequisito(reqNum, /\d/.test(val), "Al menos un número");
        validarRequisito(reqSpecial, /[@$!%*?&]/.test(val), "Al menos un carácter especial (@$!%*?&)");
    });

    confirmarInput.addEventListener("input", function () {
        if (confirmarInput.value.length > 0) {
            matchFeedback.style.display = contrasenaInput.value !== confirmarInput.value ? "block" : "none";
        } else {
            matchFeedback.style.display = "none";
        }
    });

    // --- Lógica de envío del formulario ---
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que recargue la página

        // Capturar los valores de los inputs (forzamos el correo a minúsculas)
        const nombre = document.getElementById("nombre").value.trim;
        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const celular = document.getElementById("telefono").value;
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;

        // 1. Validación de Formato de Correo Electrónico
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // 2. Validación de Celular (Solo dígitos, ej: 10 números)
        const regexTelefono = /^\d{10}$/;
        if (!regexTelefono.test(celular)) {
            alert("El número de celular debe contener exactamente 10 dígitos numéricos.");
            return;
        }

        // 3. Validación de Longitud Mínima de Contraseña
        // Expresión regular: Mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial
        const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!regexContrasena.text(contrasena)) {
            alert("La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).");
            return;
        }

        // 4. Validar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Objeto de datos a enviar al backend de Java (Spring Boot)
        const usuarioData = {
            nombre: nombre,
            correo: correo, // Se enviará siempre en minúsculas (ej: usuario@gmail.com)
            celular: celular,
            contrasena: contrasena
        };

        // Actualiza la URL para incluir el sub-endpoint "/registro"
        const URL_BACKEND = "http://localhost:8080/api/usuarios/registro";

        fetch(URL_BACKEND, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioData)
        })
            .then(response => {
                return response.text().then(texto => {
                    if (!response.ok) {
                        throw new Error(texto || "Error al registrar el usuario");
                    }
                    return texto;
                });
            })
            .then(mensaje => {
                alert(mensaje); // Muestra el mensaje exacto que manda Java ("¡Usuario registrado exitosamente!" o el error de correo duplicado)
                window.location.href = "Login.html";
            })
            .catch(error => {
                console.error("Hubo un error:", error);
                alert(error.message); // Muestra la razón real del error en pantalla
            });
    });
});