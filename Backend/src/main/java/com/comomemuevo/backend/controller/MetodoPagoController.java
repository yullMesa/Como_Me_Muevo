package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.MetodoPago;
import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.MetodoPagoRepository;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*")
public class MetodoPagoController {

    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/tarjetas")
    public ResponseEntity<?> obtenerTarjetasPorCorreo(@RequestParam String correo) {
        if (correo == null || correo.isEmpty() || correo.equals("null")) {
            return ResponseEntity.status(401).body("No hay una sesión activa. Por favor inicia sesión.");
        }

        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario de sesión no encontrado en el sistema.");
        }

        List<MetodoPago> tarjetas = metodoPagoRepository.findByUsuarioId(usuario.getId());
        return ResponseEntity.ok(tarjetas);
    }

    @PostMapping("/solicitar")
    public ResponseEntity<?> solicitarTarjetaPorCorreo(@RequestParam String correo) {
        if (correo == null || correo.isEmpty() || correo.equals("null")) {
            return ResponseEntity.status(401).body("No hay una sesión activa.");
        }

        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        MetodoPago nuevaTarjeta = new MetodoPago(
                "Tarjeta Débito C.M.M.",
                "**** **** **** " + (int)(Math.random() * 9000 + 1000),
                0.0,
                usuario
        );

        metodoPagoRepository.save(nuevaTarjeta);
        return ResponseEntity.ok(nuevaTarjeta);
    }
}