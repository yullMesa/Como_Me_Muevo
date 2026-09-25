package com.comomemuevo.backend.model;

import java.util.List;

public class PasoRutaDto {

    private String origen;
    private String destino;
    private Float tiempoEstimado;
    private String medioTransporte;
    private List<PasoDto> pasos;

    public PasoRutaDto() {}

    public PasoRutaDto(String origen, String destino, Float tiempoEstimado, String medioTransporte, List<PasoDto> pasos) {
        this.origen = origen;
        this.destino = destino;
        this.tiempoEstimado = tiempoEstimado;
        this.medioTransporte = medioTransporte;
        this.pasos = pasos;
    }

    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public Float getTiempoEstimado() { return tiempoEstimado; }
    public void setTiempoEstimado(Float tiempoEstimado) { this.tiempoEstimado = tiempoEstimado; }

    public String getMedioTransporte() { return medioTransporte; }
    public void setMedioTransporte(String medioTransporte) { this.medioTransporte = medioTransporte; }

    public List<PasoDto> getPasos() { return pasos; }
    public void setPasos(List<PasoDto> pasos) { this.pasos = pasos; }

    // Subclase interna para cada paso individual del recorrido
    public static class PasoDto {
        private int numeroPaso;
        private String titulo;
        private String descripcion;
        private String colorLinea;

        public PasoDto() {}

        public PasoDto(int numeroPaso, String titulo, String descripcion, String colorLinea) {
            this.numeroPaso = numeroPaso;
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.colorLinea = colorLinea;
        }

        public int getNumeroPaso() { return numeroPaso; }
        public void setNumeroPaso(int numeroPaso) { this.numeroPaso = numeroPaso; }

        public String getTitulo() { return titulo; }
        public void setTitulo(String titulo) { this.titulo = titulo; }

        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

        public String getColorLinea() { return colorLinea; }
        public void setColorLinea(String colorLinea) { this.colorLinea = colorLinea; }
    }
}