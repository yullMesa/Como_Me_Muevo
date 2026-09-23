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
    public ResponseEntity<List<MetodoPago>> obtenerTarjetasPorCorreo(@RequestParam String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body(null);
        }
        List<MetodoPago> tarjetas = metodoPagoRepository.findByUsuarioId(usuario.getId());
        return ResponseEntity.ok(tarjetas);
    }

    @PostMapping("/solicitar")
    public ResponseEntity<?> solicitarTarjeta(
            @RequestParam String correo,
            @RequestParam(defaultValue = "Ahorros") String tipo) {

        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado.");
        }

        String numeroAleatorio = "**** **** **** " + (1000 + (int)(Math.random() * 9000));
        double saldoInicial = tipo.equalsIgnoreCase("Crédito") ? 1500000.0 : 0.0;

        MetodoPago nuevaTarjeta = new MetodoPago(tipo, numeroAleatorio, saldoInicial, usuario);
        metodoPagoRepository.save(nuevaTarjeta);

        return ResponseEntity.ok("Tarjeta de " + tipo + " creada exitosamente.");
    }
}