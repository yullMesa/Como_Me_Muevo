package com.comomemuevo.backend.component;

import com.comomemuevo.backend.model.*;
import com.comomemuevo.backend.repository.*;
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

    // Inyecta los nuevos repositorios arriba en tu clase DataInitializer:
    @Autowired
    private LineaRepository lineaRepository;

    @Autowired
    private EstacionRepository estacionRepository;

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

        // 0. Cargar Líneas y Estaciones automáticamente si la tabla de estaciones está vacía
        if (estacionRepository.count() == 0) {
            InputStream estStream = TypeReference.class.getResourceAsStream("/estaciones-lineas.json");
            if (estStream != null) {
                DatosEstacionesDto datos = mapper.readValue(estStream, new TypeReference<DatosEstacionesDto>() {});

                // 1. Guardar Líneas primero
                for (Linea l : datos.getLineas()) {
                    // Validar si ya existe por nombre para evitar duplicados
                    if (lineaRepository.findByNombre(l.getNombre()) == null) {
                        lineaRepository.save(l);
                    }
                }

                // 2. Guardar Estaciones enlazándolas con su línea correspondiente
                for (EstacionDto estDto : datos.getEstaciones()) {
                    Linea lineaAsociada = lineaRepository.findByNombre(estDto.getNombreLinea());
                    if (lineaAsociada != null) {
                        Estacion estacion = new Estacion();
                        estacion.setNombre(estDto.getNombre());
                        estacion.setLatitud(estDto.getLatitud());
                        estacion.setLongitud(estDto.getLongitud());
                        estacion.setLinea(lineaAsociada);
                        estacionRepository.save(estacion);
                    }
                }
                System.out.println("✅ ¡Líneas y estaciones cargadas y vinculadas exitosamente desde JSON!");
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

    // DTOs auxiliares para leer el JSON combinado de líneas y estaciones
    public static class DatosEstacionesDto {
        private List<Linea> lineas;
        private List<EstacionDto> estaciones;

        public List<Linea> getLineas() { return lineas; }
        public void setLineas(List<Linea> lineas) { this.lineas = lineas; }
        public List<EstacionDto> getEstaciones() { return estaciones; }
        public void setEstaciones(List<EstacionDto> estaciones) { this.estaciones = estaciones; }
    }

    public static class EstacionDto {
        private String nombre;
        private Float latitud;
        private Float longitud;
        private String nombreLinea;

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public Float getLatitud() { return latitud; }
        public void setLatitud(Float latitud) { this.latitud = latitud; }
        public Float getLongitud() { return longitud; }
        public void setLongitud(Float longitud) { this.longitud = longitud; }
        public String getNombreLinea() { return nombreLinea; }
        public void setNombreLinea(String nombreLinea) { this.nombreLinea = nombreLinea; }
    }
}