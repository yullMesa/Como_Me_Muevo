package com.comomemuevo.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import java.util.UUID;

@MappedSuperclass
public abstract class PersonaBase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String correo;

    private String celular; // <-- ¡Lo subimos aquí porque ambos lo usan!

    @Column(nullable = false)
    private String contrasena;

    public PersonaBase() {}

    // Actualizamos el constructor con parámetros para que reciba el celular
    public PersonaBase(String nombre, String correo, String celular, String contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
        this.contrasena = contrasena;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    // Getters y Setters de celular en la clase base
    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}