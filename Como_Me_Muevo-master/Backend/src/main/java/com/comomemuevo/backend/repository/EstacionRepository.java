package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.Estacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EstacionRepository extends JpaRepository<Estacion, Long> {
    
    // Método personalizado para consultar las estaciones de una línea ordenadas por su posición (orden)
    List<Estacion> findByLineaIdOrderByOrdenAsc(Long lineaId);
}