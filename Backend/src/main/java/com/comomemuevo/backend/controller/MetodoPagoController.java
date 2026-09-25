package com.comomemuevo.backend.controller;

import com.comomemuevo.backend.model.MetodoPago;
import com.comomemuevo.backend.model.Usuario;
import com.comomemuevo.backend.repository.MetodoPagoRepository;
import com.comomemuevo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "*") // Crucial para evitar errores CORS
public class MetodoPagoController {

    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/tarjetas")
    public ResponseEntity<?> obtenerTarjetasPorCorreo(@RequestParam String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("⚠️ Usuario no encontrado.");
        }
        List<MetodoPago> tarjetas = metodoPagoRepository.findByUsuarioId(usuario.getId());
        if (tarjetas.isEmpty()) {
            return ResponseEntity.status(400).body("⚠️ Usuario sin tarjeta registrada.");
        }
        return ResponseEntity.ok(tarjetas);
    }

    @PostMapping("/solicitar")
    public ResponseEntity<?> solicitarTarjeta(
            @RequestParam String correo,
            @RequestParam(defaultValue = "Ahorros") String tipo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("⚠️ Usuario no encontrado.");
        }
        String numeroAleatorio = "**** **** **** " + (1000 + (int)(Math.random() * 9000));
        double saldoInicial = tipo.equalsIgnoreCase("Crédito") ? 1500000.0 : 0.0;
        MetodoPago nuevaTarjeta = new MetodoPago(tipo, numeroAleatorio, saldoInicial, usuario);
        metodoPagoRepository.save(nuevaTarjeta);
        return ResponseEntity.ok("✅ Tarjeta de " + tipo + " creada con éxito.");
    }

    // Eliminar por correo y tipo de tarjeta (Mucho más cómodo para proyectos escolares)
    @DeleteMapping("/eliminar-por-tipo")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> eliminarTarjetaPorTipo(
            @RequestParam String correo,
            @RequestParam String tipo) {

        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("⚠️ Usuario no encontrado.");
        }

        List<MetodoPago> tarjetas = metodoPagoRepository.findByUsuarioId(usuario.getId());
        MetodoPago tarjetaAEliminar = tarjetas.stream()
                .filter(t -> t.getTipo().equalsIgnoreCase(tipo.trim()))
                .findFirst()
                .orElse(null);

        if (tarjetaAEliminar == null) {
            return ResponseEntity.status(404).body("⚠️ No se encontró una tarjeta de tipo " + tipo + " para este usuario.");
        }

        metodoPagoRepository.delete(tarjetaAEliminar);
        return ResponseEntity.ok("🗑️ Tarjeta de " + tipo + " eliminada correctamente.");
    }

    // Transferir a otro usuario por correo destino
    @PostMapping("/transferir-externo")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> transferirAOtroUsuario(
            @RequestParam String correoOrigen,
            @RequestParam String correoDestino,
            @RequestParam double monto,
            @RequestParam(required = false, defaultValue = "Ahorros") String tipoOrigen,
            @RequestParam(required = false, defaultValue = "Ahorros") String tipoDestino) {

        if (monto <= 0) {
            return ResponseEntity.badRequest().body("⚠️ El monto debe ser mayor a 0.");
        }

        Usuario usrOrigen = usuarioRepository.findByCorreo(correoOrigen);
        Usuario usrDestino = usuarioRepository.findByCorreo(correoDestino);

        if (usrOrigen == null || usrDestino == null) {
            return ResponseEntity.status(404).body("⚠️ Usuario de origen o destino no encontrado en la base de datos.");
        }

        List<MetodoPago> tOrigenList = metodoPagoRepository.findByUsuarioId(usrOrigen.getId());
        List<MetodoPago> tDestinoList = metodoPagoRepository.findByUsuarioId(usrDestino.getId());

        if (tOrigenList.isEmpty() || tDestinoList.isEmpty()) {
            return ResponseEntity.status(400).body("⚠️ Uno de los usuarios no tiene tarjetas o cuentas registradas.");
        }

        MetodoPago cuentaOrigen = tOrigenList.stream()
                .filter(t -> t.getTipo().equalsIgnoreCase(tipoOrigen.trim()))
                .findFirst()
                .orElse(tOrigenList.get(0));

        MetodoPago cuentaDestino = tDestinoList.stream()
                .filter(t -> t.getTipo().equalsIgnoreCase(tipoDestino.trim()))
                .findFirst()
                .orElse(tDestinoList.get(0));

        if (!cuentaOrigen.getTipo().equalsIgnoreCase("Crédito") && cuentaOrigen.getSaldo() < monto) {
            return ResponseEntity.badRequest().body("❌ Fondos insuficientes en la cuenta de origen (" + cuentaOrigen.getTipo() + ").");
        }

        cuentaOrigen.setSaldo(cuentaOrigen.getSaldo() - monto);
        cuentaDestino.setSaldo(cuentaDestino.getSaldo() + monto);

        metodoPagoRepository.save(cuentaOrigen);
        metodoPagoRepository.save(cuentaDestino);

        return ResponseEntity.ok("🎉 ¡Transferencia de $" + monto + " COP desde tu cuenta de " + cuentaOrigen.getTipo() + " hacia la cuenta de " + cuentaDestino.getTipo() + " de " + correoDestino + " realizada con éxito!");
    }

    @PostMapping("/actualizar-saldo")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> actualizarSaldoPorTipo(
            @RequestParam String correo,
            @RequestParam String tipo,
            @RequestParam double monto,
            @RequestParam boolean esGasto,
            @RequestParam(defaultValue = "1") int cuotas) {

        Usuario usuario = usuarioRepository.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.status(404).body("⚠️ Usuario no encontrado.");
        }

        List<MetodoPago> tarjetas = metodoPagoRepository.findByUsuarioId(usuario.getId());
        MetodoPago tarjeta = tarjetas.stream()
                .filter(t -> t.getTipo().equalsIgnoreCase(tipo.trim()))
                .findFirst()
                .orElse(null);

        if (tarjeta == null) {
            return ResponseEntity.status(404).body("⚠️ No se encontró una tarjeta de tipo " + tipo);
        }

        double montoFinal = monto;

        if (esGasto) {
            if (tipo.equalsIgnoreCase("Ahorros")) {
                // Interés del 1.5% mensual aplicado en retiros/gastos de Ahorros
                montoFinal = monto * 1.015;
                if (tarjeta.getSaldo() < montoFinal) {
                    return ResponseEntity.badRequest().body("❌ Fondos insuficientes (Incluye 1.5% de interés por retiro en Ahorros).");
                }
                tarjeta.setSaldo(tarjeta.getSaldo() - montoFinal);

            } else if (tipo.equalsIgnoreCase("Corriente")) {
                // Sobregiro del 20% permitido en Cuenta Corriente
                double saldoMaximoConSobregiro = tarjeta.getSaldo() * 1.20;
                if (saldoMaximoConSobregiro < monto) {
                    return ResponseEntity.badRequest().body("❌ Fondos insuficientes, supera el sobregiro permitido del 20%.");
                }
                tarjeta.setSaldo(tarjeta.getSaldo() - monto);

            } else if (tipo.equalsIgnoreCase("Crédito")) {
                // Reglas de Tarjeta de Crédito (5.4): Cuotas e intereses
                double interes = 0.0;
                if (cuotas >= 3 && cuotas <= 6) {
                    interes = 0.019; // 1.9% mensual
                } else if (cuotas >= 7) {
                    interes = 0.023; // 2.3% mensual
                }
                double totalConInteres = monto + (monto * interes * cuotas);
                tarjeta.setSaldo(tarjeta.getSaldo() - totalConInteres);
            }
        } else {
            tarjeta.setSaldo(tarjeta.getSaldo() + monto);
        }

        metodoPagoRepository.save(tarjeta);
        return ResponseEntity.ok(tarjeta);
    }
}