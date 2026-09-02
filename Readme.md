# 🚇 ¿Cómo me muevo?

Plataforma web y aplicación orientada a facilitar la planeación de rutas y la gestión de movilidad dentro del sistema de transporte masivo en Medellín (Metro, Metrocable, Metroplús, Tranvía y líneas integradas), ofreciendo información en tiempo real sobre incidentes reportados por la comunidad.

---

## 👥 Equipo de Trabajo y Roles

* **Yull Sebastián Mesa Tangarife** — QA / Scrum Master
* **Johan Zapata Cifuentes** — Frontend / Product Owner
* **Mariana Sánchez Manco** — Frontend
* **Juan Manuel Vélez Buitrago** — Backend

---

## 🛑 Descripción del Problema

Los usuarios del sistema integrado de transporte de Medellín a menudo experimentan dificultades para planear sus trayectos óptimos de un punto A a un punto B, desconociendo qué líneas tomar o en qué estaciones realizar transbordos eficientes. Además, la falta de información oportuna sobre incidentes y demoras genera tiempos de espera innecesarios y una experiencia de movilidad deficiente, afectando especialmente a turistas, nuevos habitantes o usuarios no frecuentes.

---

## 🎯 Objetivo Principal

Desarrollar una solución tecnológica que permita planear rutas dentro de la red del sistema Metro, integrando reportes de incidentes en tiempo real proporcionados por la comunidad para mejorar la toma de decisiones de movilidad.

---

## 📦 Alcance del Proyecto

### Lo que **SÍ** incluye:
* Búsqueda de rutas entre estaciones y puntos de origen/destino dentro del sistema Metro (Línea A, Línea B, Metrocable, Tranvía y líneas integradas).
* Visualización de rutas mediante mapa gráfico y lista de pasos en texto.
* Consulta y reporte de incidentes/alertas activas (demoras, estaciones cerradas, fallas técnicas) con marca de tiempo.

### Lo que **NO** incluye:
* Integración o convenio institucional directo con la empresa Metro de Medellín.
* Validación de ubicación mediante GPS en tiempo real (la selección de estaciones para reportes es manual).
* Alertas de novedades fuera del horario operativo del sistema.

---

## ⚙️ Requerimientos Funcionales Principales

1. **Autenticación:** Registro de nuevos usuarios, inicio de sesión, cierre de sesión y recuperación/actualización de contraseña.
2. **Gestión de Rutas:** Ingreso de origen y destino para calcular trayectos, visualización de líneas, transbordos, mapas, pasos detallados y tiempos estimados.
3. **Incidentes:** Consulta de alertas activas y listado general de reportes recientes de la comunidad, con opción de reportar nuevas incidencias y ver el historial de reportes propios.

---

## 🏗️ Arquitectura y Componentes Tecnológicos

El proyecto está estructurado bajo una arquitectura modular por capas:
* **Interfaz de Usuario (Frontend):** Cliente web desarrollado con HTML, CSS y JavaScript estructurado en módulos.
* **Backend API:** Capa de servicios y lógica de negocio implementada con **Spring Boot (Java)** conectada mediante solicitudes HTTP/REST.
* **Persistencia (Base de Datos):** Almacenamiento estructurado mediante **PostgreSQL** y gestión de entidades relacionales con JPA/Hibernate.

---

## 📄 Licencia y Derechos

© 2024–2026 **¿Cómo me muevo?**. Todos los derechos reservados.