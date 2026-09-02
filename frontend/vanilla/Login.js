document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim().toLowerCase();
    const contrasena = document.getElementById('contrasena').value;
    const mensajeError = document.getElementById('mensajeError');

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

        if (resultado.includes('¡Bienvenido')) {
            alert(resultado);
            // Redirige al panel principal o dashboard
            window.location.href = 'Dashboard.html';
        } else {
            mensajeError.textContent = resultado;
        }
    } catch (error) {
        console.error('Error de red:', error);
        mensajeError.textContent = 'No se pudo conectar con el servidor.';
    }
});