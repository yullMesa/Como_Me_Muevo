package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String correo;

    private String celular; // <-- Campo nuevo agregado

    @Column(nullable = false)
    private String contrasena;

    // Constructor vacío obligatorio para JPA
    public Usuario() {}

    // Constructor con parámetros (incluyendo celular)
    public Usuario(String nombre, String correo, String celular, String contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
        this.contrasena = contrasena;
    }

    // Getters y Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}