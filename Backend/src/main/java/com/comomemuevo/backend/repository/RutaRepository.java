package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.Ruta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RutaRepository extends JpaRepository<Ruta, Long> {

    @Query("SELECT r FROM Ruta r WHERE " +
            "(LOWER(r.origen) LIKE LOWER(CONCAT('%', :origen, '%')) AND LOWER(r.destino) LIKE LOWER(CONCAT('%', :destino, '%'))) OR " +
            "(LOWER(r.origen) LIKE LOWER(CONCAT('%', :destino, '%')) AND LOWER(r.destino) LIKE LOWER(CONCAT('%', :origen, '%')))")
    List<Ruta> buscarBidireccional(@Param("origen") String origen, @Param("destino") String destino);
}