package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/registro")
    public String registrarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioExistente = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (usuarioExistente != null) {
            return "Error: El correo electrónico ya está registrado.";
        }

        String hashedPassword = passwordEncoder.encode(usuario.getContrasena());
        usuario.setContrasena(hashedPassword);

        usuarioRepository.save(usuario);
        return "¡Usuario registrado exitosamente!";
    }

    @PostMapping("/login")
    public String iniciarSesion(@RequestBody Usuario usuarioLogin) {
        Usuario usuario = usuarioRepository.findByCorreo(usuarioLogin.getCorreo());

        if (usuario == null) {
            return "Error: El correo no está registrado.";
        }

        if (!passwordEncoder.matches(usuarioLogin.getContrasena(), usuario.getContrasena())) {
            return "Error: Contraseña incorrecta.";
        }

        return "¡Bienvenido " + usuario.getNombre() + "!";
    }
}