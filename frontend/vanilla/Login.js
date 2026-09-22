// --- AUTENTICACIÓN CON GOOGLE ---
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
            // Guardamos indicador de sesión
            localStorage.setItem('tokenGoogle', googleToken);
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
    const loginForm = document.getElementById('loginForm');
    const mensajeError = document.getElementById('mensajeError');

    // Funcionalidad para mostrar/ocultar la contraseña
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

    // Envío del Formulario de Login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar mensaje de error previo
        mensajeError.textContent = '';

        const correo = document.getElementById('correo').value.trim().toLowerCase();
        const contrasena = document.getElementById('contrasena').value;

        // Validar formato de correo antes de consultar al servidor
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            mensajeError.textContent = 'Por favor, ingresa un correo electrónico válido.';
            return;
        }

        const usuarioLogin = {
            correo: correo,
            contrasena: contrasena
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioLogin)
            });

            const resultado = await response.text();

            if (response.ok && (resultado.includes('¡Bienvenido') || response.status === 200)) {
                // Guardamos el correo en el localStorage para mantener la sesión
                localStorage.setItem('correoUsuario', correo);
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'Dashboard.html';
            } else {
                mensajeError.textContent = resultado || 'Correo o contraseña incorrectos.';
            }
        } catch (error) {
            console.error('Error de red:', error);
            mensajeError.textContent = 'No se pudo conectar con el servidor.';
        }
    });
});