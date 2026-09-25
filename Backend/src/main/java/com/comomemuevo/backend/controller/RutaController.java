package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.HistorialRuta;
import com.comomemuevo.backend.model.PasoRutaDto;
import com.comomemuevo.backend.model.Ruta;
import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.HistorialRutaRepository;
import com.comomemuevo.backend.repository.RutaRepository;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ResponseEntity<List<PasoRutaDto>> buscarRuta(
            @RequestParam String origen,
            @RequestParam String destino,
            @RequestParam(required = false) String correo,
            @RequestParam(defaultValue = "metro") String transporte
    ) {
        System.out.println("--- BÚSQUEDA DE RUTA PROFESIONAL INICIADA ---");
        System.out.println("Origen: " + origen + " | Destino: " + destino + " | Transporte: " + transporte);

        List<Ruta> rutasEncontradas = rutaRepository.buscarBidireccional(origen, destino);
        List<PasoRutaDto> respuestaDtoList = new ArrayList<>();

        if (!rutasEncontradas.isEmpty()) {
            Ruta r = rutasEncontradas.get(0);

            // Guardar historial si viene el correo del usuario
            if (correo != null) {
                Usuario usuario = usuarioRepository.findByCorreo(correo);
                if (usuario != null) {
                    HistorialRuta historial = new HistorialRuta(usuario, r);
                    historialRutaRepository.save(historial);
                    System.out.println("¡Historial guardado exitosamente para el correo: " + correo + "!");
                }
            }

            // Construir dinámicamente los pasos profesionales
            String colorLinea = "#2563eb"; // Azul por defecto (Metro)
            String textoMedio = "en Línea A del Sistema Masivo";

            if (transporte.equalsIgnoreCase("bus")) {
                colorLinea = "#16a34a"; // Verde
                textoMedio = "en Ruta Integrada de Bus";
            } else if (transporte.equalsIgnoreCase("carro")) {
                colorLinea = "#d93025"; // Rojo
                textoMedio = "conduciendo Automóvil particular";
            } else if (transporte.equalsIgnoreCase("moto")) {
                colorLinea = "#d97706"; // Naranja
                textoMedio = "conduciendo Motocicleta";
            } else if (transporte.equalsIgnoreCase("pie")) {
                colorLinea = "#0d9488"; // Teal
                textoMedio = "caminando a pie hasta tu destino";
            }

            Float tiempo = r.getTiempoEstimado() != null ? r.getTiempoEstimado() : 15.0f;

            List<PasoRutaDto.PasoDto> pasos = new ArrayList<>();
            pasos.add(new PasoRutaDto.PasoDto(1, "Punto de Partida", "Dirígete a la estación u origen de salida: " + r.getOrigen(), "#6b7280"));
            pasos.add(new PasoRutaDto.PasoDto(2, "Tránsito en Trayecto", "Viaja " + textoMedio + " desde " + r.getOrigen() + " hasta " + r.getDestino() + " (aprox. " + tiempo + " mins).", colorLinea));
            pasos.add(new PasoRutaDto.PasoDto(3, "Llegada al Destino", "Has llegado con éxito a tu destino final: " + r.getDestino(), "#16a34a"));

            PasoRutaDto dto = new PasoRutaDto(r.getOrigen(), r.getDestino(), tiempo, transporte, pasos);
            respuestaDtoList.add(dto);
        }

        return ResponseEntity.ok(respuestaDtoList);
    }

    @GetMapping("/historial")
    public ResponseEntity<List<HistorialRuta>> obtenerHistorial(@RequestParam String correo) {
        System.out.println("--- CONSULTANDO HISTORIAL DE RUTAS ---");
        List<HistorialRuta> historial = historialRutaRepository.findByUsuario_Correo(correo);
        return ResponseEntity.ok(historial);
    }
}