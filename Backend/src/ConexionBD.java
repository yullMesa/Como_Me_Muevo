import io.github.cdimascio.dotenv.Dotenv;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {
    // Le indicamos explícitamente que lea el archivo .env dentro de la carpeta DATABASE
    private static final Dotenv dotenv = Dotenv.configure()
            .directory("./DATABASE")
            .ignoreIfMissing()
            .load();

    private static final String URL = dotenv.get("DB_URL", "jdbc:postgresql://localhost:5432/comomemuevo");
    private static final String USUARIO = dotenv.get("DB_USER", "postgres");
    private static final String PASSWORD = dotenv.get("DB_PASSWORD", "");

    public static Connection obtenerConexion() {
        try {
            return DriverManager.getConnection(URL, USUARIO, PASSWORD);
        } catch (SQLException e) {
            System.out.println("❌ Error al conectar con la base de datos: " + e.getMessage());
            return null;
        }
    }
}