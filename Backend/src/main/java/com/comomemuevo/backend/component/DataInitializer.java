package com.comomemuevo.backend.component;

import com.comomemuevo.backend.model.Ruta;
import com.comomemuevo.backend.repository.RutaRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RutaRepository rutaRepository;

    @Override
    public void run(String... args) throws Exception {
        if (rutaRepository.count() == 0) {
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<Ruta>> typeReference = new TypeReference<List<Ruta>>() {};
            InputStream inputStream = TypeReference.class.getResourceAsStream("/rutas-iniciales.json");

            if (inputStream != null) {
                List<Ruta> rutas = mapper.readValue(inputStream, typeReference);
                rutaRepository.saveAll(rutas);
                System.out.println("✅ ¡Rutas iniciales cargadas exitosamente desde el JSON!");
            }
        }
    }
}