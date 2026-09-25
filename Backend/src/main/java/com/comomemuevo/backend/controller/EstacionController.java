package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Estacion;
import com.comomemuevo.backend.repository.EstacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estaciones")
@CrossOrigin(origins = "*") // Permite peticiones desde el frontend sin atados de CORS
public class EstacionController {

    @Autowired
    private EstacionRepository estacionRepository;

    @GetMapping
    public List<Estacion> obtenerTodasLasEstaciones() {
        return estacionRepository.findAll();
    }
}