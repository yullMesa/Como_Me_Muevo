package com.comomemuevo.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario extends PersonaBase {

    // Constructor vacío
    public Usuario() {
        super();
    }

    // Constructor con parámetros enviando todo al padre con super()
    public Usuario(String nombre, String correo, String celular, String contrasena) {
        super(nombre, correo, celular, contrasena);
    }


}