package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.Incidente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidenteRepository extends JpaRepository<Incidente, Long> {
    // Permite listar los incidentes por usuario si lo necesitas más adelante
    List<Incidente> findByUsuarioId(Long usuarioId);
}