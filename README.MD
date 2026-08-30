# ¿Cómo me muevo? 🚍

Plataforma web y aplicación orientada a facilitar la planeación de rutas y la gestión de movilidad dentro del sistema de transporte masivo en Medellín (Metro, Metrocable, Metroplús, Tranvía y líneas integradas), ofreciendo información en tiempo real sobre incidentes reportados por la comunidad[cite: 2].

## 👥 Equipo de Trabajo y Roles
* **Yull Sebastián Mesa Tangarife**: QA / Scrum Master[cite: 2]
* **Johan Zapata Cifuentes**: Frontend / Product Owner[cite: 2]
* **Mariana Sánchez Manco**: Frontend[cite: 2]
* **Juan Manuel Vélez Buitrago**: Backend[cite: 2]

---

## 🎯 Descripción del Problema
Los usuarios del sistema integrado de transporte de Medellín a menudo experimentan dificultades para planear sus trayectos óptimos de un punto A a un punto B, desconociendo qué líneas tomar o en qué estaciones realizar transbordos eficientes[cite: 2]. Además, la falta de información oportuna sobre incidentes y demoras genera tiempos de espera innecesarios y una experiencia de movilidad deficiente, afectando especialmente a turistas, nuevos habitantes o usuarios no frecuentes[cite: 2].

## 🌟 Objetivo Principal
Desarrollar una solución tecnológica que permita planear rutas dentro de la red del sistema Metro, integrando reportes de incidentes en tiempo real proporcionados por la comunidad para mejorar la toma de decisiones de movilidad[cite: 2].

---

## 🚀 Alcance del Proyecto

### Lo que SÍ incluye:
* Búsqueda de rutas entre estaciones y puntos de origen/destino dentro del sistema Metro (Línea A, Línea B, Metrocable, Tranvía y líneas integradas)[cite: 2].
* Visualización de rutas mediante mapa gráfico y lista de pasos en texto[cite: 2].
* Consulta y reporte de incidentes/alertas activas (demoras, estaciones cerradas, fallas técnicas) con marca de tiempo[cite: 2].

### Lo que NO incluye:
* Integración o convenio institucional directo con la empresa Metro de Medellín[cite: 2].
* Validación de ubicación mediante GPS en tiempo real (la selección de estaciones para reportes es manual)[cite: 2].
* Alertas de novedades fuera del horario operativo del sistema[cite: 2].

---

## 📋 Requerimientos Funcionales Principales
* **Autenticación**: Registro de nuevos usuarios, inicio de sesión, cierre de sesión y recuperación/actualización de contraseña[cite: 2].
* **Gestión de Rutas**: Ingreso de origen y destino para calcular trayectos, visualización de líneas, transbordos, mapas, pasos detallados y tiempos estimados[cite: 2].
* **Incidentes**: Consulta de alertas activas y listado general de reportes recientes de la comunidad, con opción de reportar nuevas incidencias y ver el historial de reportes propios[cite: 2].

---

## 🛠️ Arquitectura y Componentes Tecnológicos
El proyecto está estructurado bajo una arquitectura modular por capas:
* **Interfaz de Usuario (Frontend)**: Cliente web desarrollado con HTML, CSS y JavaScript[cite: 2].
* **Backend API**: Capa de servicios y lógica de negocio conectada mediante solicitudes HTTP/REST[cite: 2].
* **Persistencia (Base de Datos)**: Almacenamiento estructurado mediante SQL para la gestión de entidades críticas:
    * *Usuarios*: Registro de credenciales y roles (`super_admin`, `admin_empresa`, `usuario`)[cite: 2].
    * *Empresas*: Asociaciones de transporte aliadas[cite: 2].
    * *Líneas y Estaciones*: Datos geolocalizados de la red de transporte (latitud, longitud)[cite: 2].
    * *Rutas e Incidentes*: Aislamiento de datos multi-tenant por empresa y registro de alertas comunitarias[cite: 2].

---

## 📄 Licencia y Derechos
© 2024–2026 ¿Cómo me muevo?. Todos los derechos reservados[cite: 2].