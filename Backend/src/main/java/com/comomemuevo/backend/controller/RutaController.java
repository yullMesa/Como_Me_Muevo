package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.HistorialRuta;
import com.comomemuevo.backend.model.Ruta;
import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.HistorialRutaRepository;
import com.comomemuevo.backend.repository.RutaRepository;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rutas")
@CrossOrigin(origins = "*")
public class RutaController {

    @Autowired
    private RutaRepository rutaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private HistorialRutaRepository historialRutaRepository;

    @GetMapping("/buscar")
    public ResponseEntity<List<Ruta>> buscarRuta(
            @RequestParam String origen,
            @RequestParam String destino,
            @RequestParam(required = false) String correo
    ) {
        System.out.println("--- BÚSQUEDA DE RUTA INICIADA ---");
        System.out.println("Origen: " + origen + " | Destino: " + destino);
        System.out.println("Correo recibido: " + correo);
        List<Ruta> rutasEncontradas = rutaRepository.buscarBidireccional(origen, destino);

        if (!rutasEncontradas.isEmpty() && correo != null) {
            Ruta rutaElegida = rutasEncontradas.get(0);
            Usuario usuario = usuarioRepository.findByCorreo(correo);
            if (usuario != null) {
                HistorialRuta historial = new HistorialRuta(usuario, rutaElegida);
                historialRutaRepository.save(historial);
                System.out.println("¡HISTORIAL GUARDADO EXITOSAMENTE PARA EL CORREO: " + correo + "!");
            } else {
                System.out.println("AVISO: El usuario con correo " + correo + " no existe.");
            }
        }
        return ResponseEntity.ok(rutasEncontradas);
    }

    // NUEVO ENDPOINT PARA CONSUMIR EL HISTORIAL DESDE EL FRONTEND
    @GetMapping("/historial")
    public ResponseEntity<List<HistorialRuta>> obtenerHistorial(@RequestParam String correo) {
        System.out.println("--- CONSULTANDO HISTORIAL DE RUTAS ---");
        System.out.println("Correo solicitado: " + correo);
        List<HistorialRuta> historial = historialRutaRepository.findByUsuario_Correo(correo);
        return ResponseEntity.ok(historial);
    }
}