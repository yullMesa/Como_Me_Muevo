package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Linea;
import com.comomemuevo.backend.repository.LineaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lineas")
@CrossOrigin(origins = "*")
public class LineaController {

    @Autowired
    private LineaRepository lineaRepository;

    @GetMapping
    public List<Linea> obtenerTodasLasLineas() {
        return lineaRepository.findAll();
    }
}