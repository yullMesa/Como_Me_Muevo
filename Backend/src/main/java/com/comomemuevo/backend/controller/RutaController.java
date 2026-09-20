package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Ruta;
import com.comomemuevo.backend.repository.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rutas")
@CrossOrigin(origins = "*") // Permite la conexión con el frontend
public class RutaController {



    @Autowired
    private RutaRepository rutaRepository;

    // 1. Endpoint para obtener todas las rutas registradas
    @GetMapping
    public List<Ruta> obtenerTodasLasRutas() {
        return rutaRepository.findAll();
    }

    // 2. Endpoint para registrar una nueva ruta (si el usuario o un administrador la crea)
    @PostMapping
    public ResponseEntity<String> crearRuta(@RequestBody Ruta nuevaRuta) {
        try {
            rutaRepository.save(nuevaRuta);
            return ResponseEntity.ok("¡Ruta registrada exitosamente!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar la ruta: " + e.getMessage());
        }
    }

    // 3. Endpoint opcional para buscar rutas por origen y destino
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarRutas(@RequestParam String origen, @RequestParam String destino) {
        List<Ruta> rutasEncontradas = rutaRepository.buscarBidireccional(origen, destino);

        if (rutasEncontradas.isEmpty()) {
            return ResponseEntity.status(404).body("No se encontraron rutas para ese trayecto.");
        }

        return ResponseEntity.ok(rutasEncontradas);
    }
}