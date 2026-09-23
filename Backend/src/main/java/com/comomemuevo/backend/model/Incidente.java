package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidentes")
public class Incidente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tipo; // Tipo de accidente (Fase 1)

    @Column(columnDefinition = "TEXT")
    private String descripcion; // Descripción principal (Fase 1)

    @Column(nullable = false)
    private LocalDateTime fechaHora; // Fecha y hora unificadas (Fase 1)

    // --- NUEVOS CAMPOS PARA LAS FASES 2 Y 3 ---
    @Column(length = 255)
    private String ubicacionTexto; // Ubicación ingresada en el input o mapa (Fase 1)

    @Column(length = 100)
    private String afectacionTrafico; // Estado del tráfico (Fase 2)

    @Column(columnDefinition = "TEXT")
    private String observacionesEmergencia; // Observaciones adicionales (Fase 2)

    @Column(nullable = false)
    private Boolean activo = true;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario; // Relación con el usuario logueado por correo

    // Hacemos que la estación sea opcional (nullable = true) por si el usuario escribe una dirección libre en texto en lugar de seleccionar una estación estricta
    @ManyToOne
    @JoinColumn(name = "estacion_id", nullable = true)
    private Estacion estacion;

    public Incidente() {}

    public Incidente(String tipo, String descripcion, LocalDateTime fechaHora, String ubicacionTexto, String afectacionTrafico, String observacionesEmergencia, Boolean activo, Usuario usuario, Estacion estacion) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fechaHora = fechaHora;
        this.ubicacionTexto = ubicacionTexto;
        this.afectacionTrafico = afectacionTrafico;
        this.observacionesEmergencia = observacionesEmergencia;
        this.activo = activo;
        this.usuario = usuario;
        this.estacion = estacion;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }

    public String getUbicacionTexto() { return ubicacionTexto; }
    public void setUbicacionTexto(String ubicacionTexto) { this.ubicacionTexto = ubicacionTexto; }

    public String getAfectacionTrafico() { return afectacionTrafico; }
    public void setAfectacionTrafico(String afectacionTrafico) { this.afectacionTrafico = afectacionTrafico; }

    public String getObservacionesEmergencia() { return observacionesEmergencia; }
    public void setObservacionesEmergencia(String observacionesEmergencia) { this.observacionesEmergencia = observacionesEmergencia; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public Estacion getEstacion() { return estacion; }
    public void setEstacion(Estacion estacion) { this.estacion = estacion; }
}