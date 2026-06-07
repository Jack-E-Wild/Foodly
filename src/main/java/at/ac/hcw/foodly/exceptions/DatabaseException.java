package at.ac.hcw.foodly.exceptions;


public class DatabaseException extends RuntimeException {

    public DatabaseException() {
        super("There was an exception creating the database");
    }

    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}