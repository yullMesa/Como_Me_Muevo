package com.comomemuevo.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "estaciones")
public class Estacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private Float latitud;
    private Float longitud;

    @ManyToOne
    @JoinColumn(name = "linea_id", nullable = false)
    private Linea linea;

    public Estacion() {}

    public Estacion(String nombre, Float latitud, Float longitud, Linea linea) {
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.linea = linea;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Float getLatitud() { return latitud; }
    public void setLatitud(Float latitud) { this.latitud = latitud; }
    public Float getLongitud() { return longitud; }
    public void setLongitud(Float longitud) { this.longitud = longitud; }
    public Linea getLinea() { return linea; }
    public void setLinea(Linea linea) { this.linea = linea; }
}