package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.Incidente;
import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.IncidenteRepository;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/incidentes")
@CrossOrigin(origins = "*") // Permite la comunicación con el frontend
public class IncidenteController {

    @Autowired
    private IncidenteRepository incidenteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/crear")
    public ResponseEntity<?> crearIncidente(@RequestBody Map<String, Object> payload) {
        try {
            // 1. Extraer los datos enviados desde JavaScript
            String correo = (String) payload.get("correo");
            String tipo = (String) payload.get("tipo");
            String descripcion = (String) payload.get("descripcion");
            String ubicacionTexto = (String) payload.get("ubicacionTexto");
            String afectacionTrafico = (String) payload.get("afectacionTrafico");
            String observacionesEmergencia = (String) payload.get("observacionesEmergencia");

            // 2. Buscar al usuario de forma segura con validación de nulos
            Usuario usuario = usuarioRepository.findByCorreo(correo);
            if (usuario == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Usuario no encontrado en la base de datos."));
            }

            // 3. Crear y poblar la entidad Incidente
            Incidente incidente = new Incidente();
            incidente.setTipo(tipo);
            incidente.setDescripcion(descripcion);
            incidente.setUbicacionTexto(ubicacionTexto);
            incidente.setAfectacionTrafico(afectacionTrafico);
            incidente.setObservacionesEmergencia(observacionesEmergencia);
            incidente.setFechaHora(LocalDateTime.now());
            incidente.setActivo(true);
            incidente.setUsuario(usuario);
            incidente.setEstacion(null);

            // 4. Guardar en PostgreSQL
            incidenteRepository.save(incidente);

            return ResponseEntity.ok(Map.of("mensaje", "¡Reporte guardado exitosamente!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}