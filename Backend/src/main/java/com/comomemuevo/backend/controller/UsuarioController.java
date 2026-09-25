package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.comomemuevo.backend.model.PerfilDTO;
import java.util.Map;
import java.util.HashMap;

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

    @GetMapping("/perfil/{correo}")
    public ResponseEntity<PerfilDTO> obtenerPerfilPorCorreo(@PathVariable String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.notFound().build(); // Devuelve un 404 limpio en vez de vaciar la respuesta
        }

        PerfilDTO perfil = new PerfilDTO();
        perfil.setNombre(usuario.getNombre());
        perfil.setEmail(usuario.getCorreo());
        perfil.setCiudad("Medellín");

        return ResponseEntity.ok(perfil);
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Map<String, Object> payload) {
        String correoActual = (String) payload.get("correoActual");
        if (correoActual == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No se especificó el usuario actual."));
        }

        Usuario usuario = usuarioRepository.findByCorreo(correoActual);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        String nuevoNombre = (String) payload.get("nombre");
        String nuevoCorreo = (String) payload.get("correo");
        String nuevaContrasena = (String) payload.get("contrasena");

        // Actualizar Nombre si viene en la petición
        if (nuevoNombre != null && !nuevoNombre.trim().isEmpty()) {
            usuario.setNombre(nuevoNombre);
        }

        // Actualizar Correo validando que no esté ocupado
        if (nuevoCorreo != null && !nuevoCorreo.trim().isEmpty()) {
            Usuario usuarioExistente = usuarioRepository.findByCorreo(nuevoCorreo);
            if (usuarioExistente != null && !usuarioExistente.getCorreo().equals(correoActual)) {
                return ResponseEntity.badRequest().body(Map.of("error", "El correo ya está registrado por otro usuario."));
            }
            usuario.setCorreo(nuevoCorreo);
        }

        // Actualizar Contraseña cifrándola con BCrypt
        if (nuevaContrasena != null && !nuevaContrasena.trim().isEmpty()) {
            usuario.setContrasena(passwordEncoder.encode(nuevaContrasena));
        }

        usuarioRepository.save(usuario);
        return ResponseEntity.ok(Map.of(
                "mensaje", "¡Perfil actualizado exitosamente!",
                "nuevoCorreo", usuario.getCorreo()
        ));
    }
}

