package at.ac.hcw.foodly;

import java.sql.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseUtil {
    private static final String JDBC_URL = "jdbc:h2:~/FoodlyDB";
    private static final String USER = "root";
    private static final String PASSWORD = "root";
    private static Connection connectionInstance;

    public static void createTable() {
        try {
            Connection myConnection = getConnection();
            Statement myStatement = myConnection.createStatement();
            // etwas, das eine datenbank anlegt = macht die sql connection anscheinend?
            // etwas, das diese statements versteht

            //  SQL statements
            String SQLstring = "CREATE TABLE IF NOT EXISTS ingredients " +
                    "(id UUID PRIMARY KEY," +
                    "name VARCHAR(255) NOT NULL," +
                    "foodgroup VARCHAR(100) NOT NULL," +
                    "icon VARCHAR(100) NOT NULL," +
                    "proteins INT NOT NULL) " +
                    "carbohydrates INT NOT NULL) " +
                    "fibres INT NOT NULL) " +
                    "fats INT NOT NULL) " +
                    "water INT NOT NULL) " +
                    "energy INT NOT NULL) " +
                    "release_year INT NOT NULL)";
            myStatement.execute(SQLstring);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() {
        try {
            if (connectionInstance == null) {
                connectionInstance = getConnectionInstance();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connectionInstance;
    }

    //Creational Pattern: Singleton
    private static Connection getConnectionInstance() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, USER, PASSWORD);
    }

}