package com.comomemuevo.backend.dto;

import java.util.List;

public class RutaResponseDTO {
    private String origen;
    private String destino;
    private int tiempoEstimadoMinutos;
    private List<PasoRutaDTO> pasos;

    // Constructor vacío
    public RutaResponseDTO() {}

    // Constructor completo
    public RutaResponseDTO(String origen, String destino, int tiempoEstimadoMinutos, List<PasoRutaDTO> pasos) {
        this.origen = origen;
        this.destino = destino;
        this.tiempoEstimadoMinutos = tiempoEstimadoMinutos;
        this.pasos = pasos;
    }

    // Getters y Setters
    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public int getTiempoEstimadoMinutos() { return tiempoEstimadoMinutos; }
    public void setTiempoEstimadoMinutos(int tiempoEstimadoMinutos) { this.tiempoEstimadoMinutos = tiempoEstimadoMinutos; }

    public List<PasoRutaDTO> getPasos() { return pasos; }
    public void setPasos(List<PasoRutaDTO> pasos) { this.pasos = pasos; }

    // Clase interna para los pasos detallados
    public static class PasoRutaDTO {
        private String linea;
        private String estacionOrigen;
        private String estacionDestino;
        private String instruccion;

        public PasoRutaDTO() {}

        public PasoRutaDTO(String linea, String estacionOrigen, String estacionDestino, String instruccion) {
            this.linea = linea;
            this.estacionOrigen = estacionOrigen;
            this.estacionDestino = estacionDestino;
            this.instruccion = instruccion;
        }

        public String getLinea() { return linea; }
        public void setLinea(String linea) { this.linea = linea; }

        public String getEstacionOrigen() { return estacionOrigen; }
        public void setEstacionOrigen(String estacionOrigen) { this.estacionOrigen = estacionOrigen; }

        public String getEstacionDestino() { return estacionDestino; }
        public void setEstacionDestino(String estacionDestino) { this.estacionDestino = estacionDestino; }

        public String getInstruccion() { return instruccion; }
        public void setInstruccion(String instruccion) { this.instruccion = instruccion; }
    }
}