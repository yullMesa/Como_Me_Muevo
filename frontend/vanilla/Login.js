document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim().toLowerCase();
    const contrasena = document.getElementById('contrasena').value;
    const mensajeError = document.getElementById('mensajeError');

    // Definimos las claves para el almacenamiento local de intentos
    const intentosKey = `intentos_${correo}`;
    const bloqueadoKey = `bloqueado_${correo}`;

    // Verificamos si la cuenta está bloqueada
    const estaBloqueado = localStorage.getItem(bloqueadoKey);
    if (estaBloqueado) {
        mensajeError.textContent = 'Cuenta bloqueada temporalmente por seguridad tras 3 intentos fallidos.';
        return;
    }

    // Obtenemos los intentos actuales (por defecto 0)
    let intentosFallidos = parseInt(localStorage.getItem(intentosKey)) || 0;

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
            // Si el login es exitoso, limpiamos los intentos fallidos y guardamos la sesión
            localStorage.removeItem(intentosKey);
            localStorage.removeItem(bloqueadoKey);
            localStorage.setItem('correoUsuario', correo);

            alert(resultado);
            window.location.href = 'Dashboard.html';
        } else {
            // Si falla, incrementamos el contador de intentos
            intentosFallidos++;
            localStorage.setItem(intentosKey, intentosFallidos);

            const intentosRestantes = 3 - intentosFallidos;

            if (intentosFallidos >= 3) {
                localStorage.setItem(bloqueadoKey, 'true');
                mensajeError.textContent = 'Demasiados intentos fallidos. Cuenta bloqueada.';
            } else {
                mensajeError.textContent = `${resultado} (Intentos restantes: ${intentosRestantes})`;
            }
        }
    } catch (error) {
        console.error('Error de red:', error);
        mensajeError.textContent = 'No se pudo conectar con el servidor.';
    }
});