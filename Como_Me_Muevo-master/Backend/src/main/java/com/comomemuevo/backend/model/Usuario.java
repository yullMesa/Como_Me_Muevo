package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "usuarios") //
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String nombre; //[cite: 2]

    @Column(unique = true, nullable = false) //[cite: 2]
    private String correo;

    @Column(nullable = false) //[cite: 2]
    private String contrasena;

    // Constructor vacío obligatorio para JPA[cite: 2]
    public Usuario() {}

    // Constructor con parámetros[cite: 2]
    public Usuario(String nombre, String correo, String contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    // Getters y Setters actualizados para UUID[cite: 2]
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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}