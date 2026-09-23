package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.HistorialRuta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HistorialRutaRepository extends JpaRepository<HistorialRuta, Long> {

    // Agrega este método para que Spring Boot reconozca la consulta por correo del usuario
    List<HistorialRuta> findByUsuario_Correo(String correo);

}