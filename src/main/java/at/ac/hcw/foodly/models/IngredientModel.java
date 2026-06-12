package at.ac.hcw.foodly.models;

import java.util.UUID;

public class IngredientModel {
    private UUID id;
    private String ingrName;
    private String fgName;
    private double calories;
    private double fibers;
    private double protein;
    private double carbs;
    private double fats;

    public IngredientModel(){
        this.id = UUID.randomUUID();
    }

    public IngredientModel(String ingrName, String fgName) {
        this();
        this.ingrName = ingrName;
        this.fgName = fgName;
    }

    public UUID getId() {
        return id;
    }

    public String getIngrName() {
        return ingrName;
    }

    public String getFgName() {
        return fgName;
    }


    public void setId(UUID id) {
        this.id = id;
    }

    public void setIngrName(String ingrName) {
        this.ingrName = ingrName;
    }

    public void setFgName(String fgName) {
        this.fgName = fgName;
    }


    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getFibers() {
        return fibers;
    }

    public void setFibers(double fibers) {
        this.fibers = fibers;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }
}
