import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.SQLException;

public class InicializarBD {

    private static final Dotenv dotenv = Dotenv.configure()
            .directory("./DATABASE")
            .ignoreIfMissing()
            .load();

    private static final String DB_NAME = dotenv.get("DB_URL", "jdbc:postgresql://localhost:5432/comomemuevo")
            .replaceAll(".*/([^/?]+).*$", "$1"); // Extrae el nombre de la BD dinámicamente

    public static void asegurarBaseDeDatosExiste() {
        try (Connection conexionServidor = ConexionBD.obtenerConexionServidor();
             Statement stmt = conexionServidor.createStatement()) {

            // Ejecutamos la creación de la base de datos (PostgreSQL no soporta IF NOT EXISTS en CREATE DATABASE directamente,
            // por lo que usamos un bloque o validamos, o dejamos que lance aviso si ya existe).
            String sql = "CREATE DATABASE " + DB_NAME;
            stmt.executeUpdate(sql);
            System.out.println("✅ Base de datos '" + DB_NAME + "' creada exitosamente.");
        } catch (SQLException e) {
            // Si el código de error es 42P04 significa que la base de datos ya existe, lo cual es normal y seguro ignorar.
            if (e.getSQLState() != null && e.getSQLState().equals("42P04")) {
                System.out.println("ℹ️ La base de datos '" + DB_NAME + "' ya existe. Continuando...");
            } else {
                System.out.println("⚠️ Nota en la verificación de la BD: " + e.getMessage());
            }
        }
    }

    public static void inicializarTablas() {
        // 1. Primero nos aseguramos de que la base de datos lógica exista en el servidor
        asegurarBaseDeDatosExiste();

        // 2. Arreglo con las sentencias DDL para crear toda la base de datos en orden de dependencia
        String[] sqls = {
                // Extensión de UUIDs
                "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";",

                // 1. Tabla de Empresas
                "CREATE TABLE IF NOT EXISTS empresas (" +
                        " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        " nombre VARCHAR(100) NOT NULL," +
                        " nit VARCHAR(50) UNIQUE NOT NULL," +
                        " created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ");",

                // 2. Tabla de Usuarios
                "CREATE TABLE IF NOT EXISTS usuarios (" +
                        " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        " nombre VARCHAR(100) NOT NULL," +
                        " correo VARCHAR(150) UNIQUE NOT NULL," +
                        " password_hash VARCHAR(255) NOT NULL," +
                        " rol VARCHAR(50) DEFAULT 'usuario'," +
                        " empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL," +
                        " created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ");",

                // 3. Tabla de Líneas
                "CREATE TABLE IF NOT EXISTS lineas (" +
                        " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        " nombre VARCHAR(100) NOT NULL," +
                        " color VARCHAR(50) NOT NULL" +
                        ");",

                // 4. Tabla de Estaciones
                "CREATE TABLE IF NOT EXISTS estaciones (" +
                        " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        " nombre VARCHAR(100) NOT NULL," +
                        " latitud FLOAT NOT NULL," +
                        " longitud FLOAT NOT NULL," +
                        " linea_id UUID REFERENCES lineas(id) ON DELETE CASCADE" +
                        ");",

                // 5. Tabla de Rutas
                "CREATE TABLE IF NOT EXISTS rutas (" +
                        " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        " origen_id UUID REFERENCES estaciones(id)," +
                        " destino_id UUID REFERENCES estaciones(id)," +
                        " tiempo_estimado FLOAT," +
                        " empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE" +
                        ");",

                // 6. Tabla de Incidentes
                "CREATE TABLE IF NOT EXISTS incidentes (" +
                        " id UUID PRIMARY KEY DEFAULT uuid_generate_v4()," +
                        " tipo VARCHAR(100) NOT NULL," +
                        " descripcion TEXT," +
                        " fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                        " activo BOOLEAN DEFAULT TRUE," +
                        " estacion_id UUID REFERENCES estaciones(id) ON DELETE CASCADE," +
                        " usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL" +
                        ");"
        };

        // Ejecución de las sentencias contra la base de datos del proyecto
        try (Connection conexion = ConexionBD.obtenerConexion();
             Statement statement = conexion.createStatement()) {

            if (conexion == null) {
                System.out.println("❌ No se pudo establecer la conexión para inicializar las tablas.");
                return;
            }

            for (String sql : sqls) {
                statement.execute(sql);
            }
            System.out.println("✅ ¡Todas las 6 tablas del sistema fueron verificadas y creadas con éxito!");

        } catch (SQLException e) {
            System.out.println("❌ Error al inicializar las tablas: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        inicializarTablas();
    }
}