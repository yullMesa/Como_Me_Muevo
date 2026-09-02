package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite que tu futura página web en HTML/JS se conecte sin problemas de bloqueo
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. Endpoint para listar todos los usuarios (GET: http://localhost:8080/api/usuarios)
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // 2. Endpoint para registrar un usuario nuevo (POST: http://localhost:8080/api/usuarios/registro)
    @PostMapping("/registro")
    public String registrarUsuario(@RequestBody Usuario usuario) {
        // Validar si el correo ya existe
        Usuario usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (usuarioExistente != null) {
            return "Error: El correo electrónico ya está registrado.";
        }

        usuarioRepository.save(usuario);
        return "¡Usuario registrado exitosamente!";
    }

    // 3. Endpoint para iniciar sesión (POST: http://localhost:8080/api/usuarios/login)
    @PostMapping("/login")
    public String iniciarSesion(@RequestBody Usuario usuarioLogin) {
        Usuario usuario = usuarioRepository.findByCorreo(usuarioLogin.getCorreo());

        if (usuario == null) {
            return "Error: El correo no está registrado.";
        }

        if (!usuario.getContrasena().equals(usuarioLogin.getContrasena())) {
            return "Error: Contraseña incorrecta.";
        }

        return "¡Bienvenido, " + usuario.getNombre() + "!";
    }
}