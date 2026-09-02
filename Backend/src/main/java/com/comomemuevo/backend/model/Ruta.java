package com.comomemuevo.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rutas")
public class Ruta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String origen;

    @Column(nullable = false)
    private String destino;

    private Float tiempoEstimado;

    public Ruta() {}

    public Ruta(String origen, String destino, Float tiempoEstimado) {
        this.origen = origen;
        this.destino = destino;
        this.tiempoEstimado = tiempoEstimado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public Float getTiempoEstimado() { return tiempoEstimado; }
    public void setTiempoEstimado(Float tiempoEstimado) { this.tiempoEstimado = tiempoEstimado; }
}