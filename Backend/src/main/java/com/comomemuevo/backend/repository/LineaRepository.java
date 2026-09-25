package com.comomemuevo.backend.repository;

import com.comomemuevo.backend.model.Linea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineaRepository extends JpaRepository<Linea, Long> {

    // Agrega esta línea para que Spring Data JPA sepa buscar la línea por su nombre
    Linea findByNombre(String nombre);

}