import java.sql.Connection;
import java.sql.DriverManager;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:5432/comomemuevo";
        String usuario = "postgres";
        String password = "123";

        try {
            Connection conexion = DriverManager.getConnection(url, usuario, password);
            if (conexion != null) {
                System.out.println("¡Conexión exitosa a PostgreSQL!");
            }
        } catch (Exception e) {
            System.out.println("Error al conectar: " + e.getMessage());
        }
    }
}