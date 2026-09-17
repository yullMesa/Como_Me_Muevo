document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que recargue la página

        // Capturar los valores de los inputs (forzamos el correo a minúsculas)
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value.trim().toLowerCase();
        const telefono = document.getElementById("telefono").value;
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;

        // Validar que las contraseñas coincidan
        if (contrasena !== confirmarContrasena) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Objeto de datos a enviar al backend de Java (Spring Boot)
        const usuarioData = {
            nombre: nombre,
            correo: correo, // Se enviará siempre en minúsculas (ej: usuario@gmail.com)
            telefono: telefono,
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