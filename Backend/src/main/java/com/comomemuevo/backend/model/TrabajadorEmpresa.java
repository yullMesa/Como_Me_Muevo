package com.comomemuevo.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "trabajadores_empresa")
public class TrabajadorEmpresa extends PersonaBase {

    private String cargo; // Ej: Conductor, Soporte, Administrador de rutas
    private String tipoOutsourcing; // Ej: Aliado Logístico S.A.

    // Constructor vacío obligatorio
    public TrabajadorEmpresa() {
        super();
    }

    // Constructor con parámetros: Ahora incluye 'celular' y lo pasa al super() de PersonaBase
    public TrabajadorEmpresa(String nombre, String correo, String celular, String contrasena, String cargo, String tipoOutsourcing) {
        super(nombre, correo, celular, contrasena);
        this.cargo = cargo;
        this.tipoOutsourcing = tipoOutsourcing;
    }

    // Getters y Setters
    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getTipoOutsourcing() {
        return tipoOutsourcing;
    }

    public void setTipoOutsourcing(String tipoOutsourcing) {
        this.tipoOutsourcing = tipoOutsourcing;
    }
}