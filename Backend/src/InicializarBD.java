
import java.sql.Connection;
import java.sql.Statement;

public class InicializarBD {
    public static void inicializarTablas() {
        // Arreglo con las sentencias DDL para crear toda la base de datos en orden de dependencia
        String[] sqls = {
                // Extensión de UUIDs
                "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";",

                // 1. Tabla de Empresas
                "CREATE TABLE IF NOT EXISTS empresas (" +
                        "    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        "    nombre VARCHAR(100) NOT NULL," +
                        "    nit VARCHAR(50) UNIQUE NOT NULL," +
                        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ");",

                // 2. Tabla de Usuarios
                "CREATE TABLE IF NOT EXISTS usuarios (" +
                        "    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        "    nombre VARCHAR(100) NOT NULL," +
                        "    correo VARCHAR(150) UNIQUE NOT NULL," +
                        "    password_hash VARCHAR(255) NOT NULL," +
                        "    rol VARCHAR(50) DEFAULT 'usuario'," +
                        "    empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL," +
                        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ");",

                // 3. Tabla de Líneas
                "CREATE TABLE IF NOT EXISTS lineas (" +
                        "    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        "    nombre VARCHAR(100) NOT NULL," +
                        "    color VARCHAR(50) NOT NULL" +
                        ");",

                // 4. Tabla de Estaciones
                "CREATE TABLE IF NOT EXISTS estaciones (" +
                        "    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        "    nombre VARCHAR(100) NOT NULL," +
                        "    latitud FLOAT NOT NULL," +
                        "    longitud FLOAT NOT NULL," +
                        "    linea_id UUID REFERENCES lineas(id) ON DELETE CASCADE" +
                        ");",

                // 5. Tabla de Rutas (Multi-tenancy estricto por empresa_id)
                "CREATE TABLE IF NOT EXISTS rutas (" +
                        "    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        "    empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE," +
                        "    origen VARCHAR(150) NOT NULL," +
                        "    destino VARCHAR(150) NOT NULL," +
                        "    tiempo_estimado FLOAT NOT NULL," +
                        "    activa BOOLEAN DEFAULT TRUE," +
                        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ");",

                // 6. Tabla de Incidentes
                "CREATE TABLE IF NOT EXISTS incidentes (" +
                        "    id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        "    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE," +
                        "    estacion_id UUID REFERENCES estaciones(id) ON DELETE CASCADE," +
                        "    tipo VARCHAR(100) NOT NULL," +
                        "    descripcion TEXT NOT NULL," +
                        "    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                        "    activo BOOLEAN DEFAULT TRUE" +
                        ");"
        };

        try (Connection conexion = ConexionBD.obtenerConexion();
             Statement stmt = conexion.createStatement()) {

            if (conexion != null) {
                for (String sql : sqls) {
                    stmt.execute(sql);
                }
                System.out.println("✅ ¡Todas las 6 tablas del sistema fueron verificadas y creadas con éxito!");
            }
        } catch (Exception e) {
            System.out.println("❌ Error al inicializar las tablas: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        inicializarTablas();
    }
}