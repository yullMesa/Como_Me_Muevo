package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario extends PersonaBase {

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<HistorialRuta> historialRutas = new ArrayList<>();

    // NUEVA RELACIÓN: Un usuario tiene varias tarjetas o métodos de pago
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<MetodoPago> metodosPago = new ArrayList<>();

    public Usuario() {
        super();
    }

    public Usuario(String nombre, String correo, String celular, String contrasena) {
        super(nombre, correo, celular, contrasena);
    }

    // Getters y Setters de HistorialRutas...
    public List<HistorialRuta> getHistorialRutas() { return historialRutas; }
    public void setHistorialRutas(List<HistorialRuta> historialRutas) { this.historialRutas = historialRutas; }

    // Getters y Setters de MetodosPago
    public List<MetodoPago> getMetodosPago() { return metodosPago; }
    public void setMetodosPago(List<MetodoPago> metodosPago) { this.metodosPago = metodosPago; }
}