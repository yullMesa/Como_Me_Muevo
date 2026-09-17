package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.dto.RutaResponseDTO;
import com.comomemuevo.backend.service.RutaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rutas")
@CrossOrigin(origins = "*")
public class RutaController {

    private final RutaService rutaService;

    public RutaController(RutaService rutaService) {
        this.rutaService = rutaService;
    }

    @GetMapping("/calcular")
    public ResponseEntity<RutaResponseDTO> calcularRuta(
            @RequestParam Long origenId, 
            @RequestParam Long destinoId) {
        RutaResponseDTO ruta = rutaService.calcularRuta(origenId, destinoId);
        return ResponseEntity.ok(ruta);
    }
}