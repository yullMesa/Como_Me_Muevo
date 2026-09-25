package com.comomemuevo.backend.component;

import com.comomemuevo.backend.model.Incidente;
import com.comomemuevo.backend.model.Ruta;
import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.IncidenteRepository;
import com.comomemuevo.backend.repository.RutaRepository;
import com.comomemuevo.backend.repository.UsuarioRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RutaRepository rutaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private IncidenteRepository incidenteRepository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        // 1. Cargar Rutas iniciales
        if (rutaRepository.count() == 0) {
            InputStream inputStream = TypeReference.class.getResourceAsStream("/rutas-iniciales.json");
            if (inputStream != null) {
                List<Ruta> rutas = mapper.readValue(inputStream, new TypeReference<List<Ruta>>() {});
                rutaRepository.saveAll(rutas);
                System.out.println("✅ ¡Rutas iniciales cargadas exitosamente desde el JSON!");
            }
        }

        // 2. Cargar Usuarios de prueba asegurando que no se dupliquen
        InputStream userStream = TypeReference.class.getResourceAsStream("/usuarios.json");
        if (userStream != null) {
            List<Usuario> usuarios = mapper.readValue(userStream, new TypeReference<List<Usuario>>() {});
            for (Usuario u : usuarios) {
                if (usuarioRepository.findByCorreo(u.getCorreo()) == null) {
                    usuarioRepository.save(u);
                }
            }
            System.out.println("✅ ¡Verificación de usuarios completada!");
        }

        // 3. Cargar Incidentes de prueba asociados a sus usuarios
        if (incidenteRepository.count() == 0) {
            InputStream inputStream = TypeReference.class.getResourceAsStream("/incidentes.json");
            if (inputStream != null) {
                List<IncidenteDto> incidentesDto = mapper.readValue(inputStream, new TypeReference<List<IncidenteDto>>() {});

                for (IncidenteDto dto : incidentesDto) {
                    Usuario usuario = usuarioRepository.findByCorreo(dto.getCorreoUsuario());
                    if (usuario != null) {
                        Incidente incidente = new Incidente();
                        incidente.setTipo(dto.getTipo());
                        incidente.setDescripcion(dto.getDescripcion());
                        incidente.setUbicacionTexto(dto.getUbicacionTexto());
                        incidente.setAfectacionTrafico(String.valueOf(dto.isAfectacionTráfico()));
                        incidente.setObservacionesEmergencia(dto.getObservacionesEmergencia());
                        incidente.setFechaHora(LocalDateTime.now());
                        incidente.setActivo(true);
                        incidente.setUsuario(usuario);

                        incidenteRepository.save(incidente);
                    }
                }
                System.out.println("✅ ¡Incidentes iniciales cargados y vinculados exitosamente!");
            }
        }
    }

    // DTO auxiliar interno para mapear los incidentes y enlazarlos por correo
    public static class IncidenteDto {
        private String tipo;
        private String descripcion;
        private String ubicacionTexto;
        private boolean afectacionTráfico;
        private String observacionesEmergencia;
        private String correoUsuario;
        private Long estacionId; // <-- Agregado para evitar el null

        // Getters y Setters
        public String getTipo() { return tipo; }
        public void setTipo(String tipo) { this.tipo = tipo; }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public String getUbicacionTexto() { return ubicacionTexto; }
        public void setUbicacionTexto(String ubicacionTexto) { this.ubicacionTexto = ubicacionTexto; }
        public boolean isAfectacionTráfico() { return afectacionTráfico; }
        public void setAfectacionTráfico(boolean afectacionTráfico) { this.afectacionTráfico = afectacionTráfico; }
        public String getObservacionesEmergencia() { return observacionesEmergencia; }
        public void setObservacionesEmergencia(String observacionesEmergencia) { this.observacionesEmergencia = observacionesEmergencia; }
        public String getCorreoUsuario() { return correoUsuario; }
        public void setCorreoUsuario(String correoUsuario) { this.correoUsuario = correoUsuario; }
        public Long getEstacionId() { return estacionId; }
        public void setEstacionId(Long estacionId) { this.estacionId = estacionId; }
    }
}