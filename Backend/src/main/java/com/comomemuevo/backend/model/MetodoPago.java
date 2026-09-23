package com.comomemuevo.backend.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "metodos_pago")
public class MetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String tipo; // Ej: "Tarjeta de Crédito", "Tarjeta Débito", "Cuenta Corriente"

    @Column(nullable = false, unique = true)
    private String numeroTarjeta; // O un enmascarado como "**** **** **** 1234"

    @Column(nullable = false)
    private Double saldo; // Para consultar y descontar saldos

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public MetodoPago() {}

    public MetodoPago(String tipo, String numeroTarjeta, Double saldo, Usuario usuario) {
        this.tipo = tipo;
        this.numeroTarjeta = numeroTarjeta;
        this.saldo = saldo;
        this.usuario = usuario;
    }

    // Getters y Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getNumeroTarjeta() { return numeroTarjeta; }
    public void setNumeroTarjeta(String numeroTarjeta) { this.numeroTarjeta = numeroTarjeta; }

    public Double getSaldo() { return saldo; }
    public void setSaldo(Double saldo) { this.saldo = saldo; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}