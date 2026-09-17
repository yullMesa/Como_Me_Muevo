package com.comomemuevo.backend.model; // (Mantén aquí el package exacto que tenías)

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "lineas")
public class Linea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false)
    private String tipo;

    @OneToMany(mappedBy = "linea", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Estacion> estaciones;

    // Constructores vacíos y con parámetros
    public Linea() {}

    public Linea(Long id, String nombre, String tipo, List<Estacion> estaciones) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.estaciones = estaciones;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public List<Estacion> getEstaciones() { return estaciones; }
    public void setEstaciones(List<Estacion> estaciones) { this.estaciones = estaciones; }
}