package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface MetodoPagoRepository extends JpaRepository<MetodoPago, UUID> {
    // Permite buscar todas las tarjetas asociadas a un usuario específico
    List<MetodoPago> findByUsuarioId(UUID usuarioId);
}