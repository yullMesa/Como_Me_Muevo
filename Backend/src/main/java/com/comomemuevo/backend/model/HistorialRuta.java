package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_rutas")
public class HistorialRuta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación ManyToOne con Usuario (usa el UUID heredado de PersonaBase)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Relación ManyToOne con Ruta (usa el Long id de Ruta)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ruta_id", nullable = false)
    private Ruta ruta;

    @Column(name = "fecha_consulta", nullable = false)
    private LocalDateTime fechaConsulta;

    public HistorialRuta() {
        this.fechaConsulta = LocalDateTime.now();
    }

    public HistorialRuta(Usuario usuario, Ruta ruta) {
        this.usuario = usuario;
        this.ruta = ruta;
        this.fechaConsulta = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.fechaConsulta == null) {
            this.fechaConsulta = LocalDateTime.now();
        }
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }

    public LocalDateTime getFechaConsulta() {
        return fechaConsulta;
    }

    public void setFechaConsulta(LocalDateTime fechaConsulta) {
        this.fechaConsulta = fechaConsulta;
    }
}