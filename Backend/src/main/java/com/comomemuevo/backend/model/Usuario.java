package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario extends PersonaBase {

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Evita ciclos de serialización infinita en respuestas JSON
    private List<HistorialRuta> historialRutas = new ArrayList<>();

    // Constructor vacío
    public Usuario() {
        super();
    }

    // Constructor con parámetros enviando todo al padre con super()
    public Usuario(String nombre, String correo, String celular, String contrasena) {
        super(nombre, correo, celular, contrasena);
    }

    // Getter y Setter del Historial
    public List<HistorialRuta> getHistorialRutas() {
        return historialRutas;
    }

    public void setHistorialRutas(List<HistorialRuta> historialRutas) {
        this.historialRutas = historialRutas;
    }
}