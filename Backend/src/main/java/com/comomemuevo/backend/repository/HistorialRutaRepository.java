package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.HistorialRuta;
import com.comomemuevo.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialRutaRepository extends JpaRepository<HistorialRuta, Long> {
    // Permite buscar todo el historial de un usuario ordenado por fecha de consulta
    List<HistorialRuta> findByUsuarioOrderByFechaConsultaDesc(Usuario usuario);
}