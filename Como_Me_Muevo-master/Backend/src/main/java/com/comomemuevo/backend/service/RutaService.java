package com.comomemuevo.backend.service;

import com.comomemuevo.backend.dto.RutaResponseDTO;
import com.comomemuevo.backend.model.Estacion;
import com.comomemuevo.backend.repository.EstacionRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class RutaService {

    private final EstacionRepository estacionRepository;

    public RutaService(EstacionRepository estacionRepository) {
        this.estacionRepository = estacionRepository;
    }

    public RutaResponseDTO calcularRuta(Long origenId, Long destinoId) {
        Estacion origen = estacionRepository.findById(origenId)
                .orElseThrow(() -> new RuntimeException("Estación de origen no encontrada"));
        Estacion destino = estacionRepository.findById(destinoId)
                .orElseThrow(() -> new RuntimeException("Estación de destino no encontrada"));

        RutaResponseDTO response = new RutaResponseDTO();
        response.setOrigen(origen.getNombre());
        response.setDestino(destino.getNombre());
        response.setTiempoEstimadoMinutos(15);

        RutaResponseDTO.PasoRutaDTO paso = new RutaResponseDTO.PasoRutaDTO(
                origen.getLinea().getNombre(),
                origen.getNombre(),
                destino.getNombre(),
                "Aborde en " + origen.getNombre() + " y diríjase hacia " + destino.getNombre()
        );

        response.setPasos(Collections.singletonList(paso));
        return response;
    }
}