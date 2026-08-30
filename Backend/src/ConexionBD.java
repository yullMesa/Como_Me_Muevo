import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {
    private static final Dotenv dotenv = Dotenv.configure()
            .directory("./DATABASE")
            .ignoreIfMissing()
            .load();

    private static final String URL = dotenv.get("DB_URL", "jdbc:postgresql://localhost:5432/comomemuevo");
    private static final String USUARIO = dotenv.get("DB_USER", "postgres");
    private static final String PASSWORD = dotenv.get("DB_PASSWORD", "");

    // Conexión normal a la base de datos del proyecto
    public static Connection obtenerConexion() {
        try {
            return DriverManager.getConnection(URL, USUARIO, PASSWORD);
        } catch (SQLException e) {
            System.out.println("❌ Error al conectar con la base de datos: " + e.getMessage());
            return null;
        }
    }

    // Método especial para conectarse al servidor de PostgreSQL sin especificar una base de datos propia
    public static Connection obtenerConexionServidor() {
        try {
            // Reemplaza el nombre de la BD final por la base de datos por defecto 'postgres'
            String urlServidor = URL.substring(0, URL.lastIndexOf("/") + 1) + "postgres";
            return DriverManager.getConnection(urlServidor, USUARIO, PASSWORD);
        } catch (SQLException e) {
            System.out.println("❌ Error al conectar con el servidor PostgreSQL: " + e.getMessage());
            return null;
        }
    }
}