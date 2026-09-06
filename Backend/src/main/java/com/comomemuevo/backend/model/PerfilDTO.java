package com.comomemuevo.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class PerfilDTO {

    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @Email(message = "Debe ser un correo electrónico válido")
    private String email;

    private String ciudad;
    private List<String> preferenciasTransporte;

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getCiudad() {
        return ciudad;
    }
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public List<String> getPreferenciasTransporte() {
        return preferenciasTransporte;
    }
    public void setPreferenciasTransporte(List<String> preferenciasTransporte) {
        this.preferenciasTransporte = preferenciasTransporte;
    }
}