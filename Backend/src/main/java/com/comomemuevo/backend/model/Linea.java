package com.comomemuevo.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lineas")
public class Linea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String color;

    public Linea() {}

    public Linea(String nombre, String color) {
        this.nombre = nombre;
        this.color = color;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}