package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Estacion;
import com.comomemuevo.backend.model.Linea;
import com.comomemuevo.backend.repository.EstacionRepository;
import com.comomemuevo.backend.repository.LineaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transport")
@CrossOrigin(origins = "*")
public class TransportController {

    private final LineaRepository lineaRepository;
    private final EstacionRepository estacionRepository;

    public TransportController(LineaRepository lineaRepository, EstacionRepository estacionRepository) {
        this.lineaRepository = lineaRepository;
        this.estacionRepository = estacionRepository;
    }

    @GetMapping("/lineas")
    public ResponseEntity<List<Linea>> obtenerLineas() {
        return ResponseEntity.ok(lineaRepository.findAll());
    }

    @GetMapping("/lineas/{lineaId}/estaciones")
    public ResponseEntity<List<Estacion>> obtenerEstacionesPorLinea(@PathVariable Long lineaId) {
        List<Estacion> estaciones = estacionRepository.findByLineaIdOrderByOrdenAsc(lineaId);
        return ResponseEntity.ok(estaciones);
    }
}