package at.ac.hcw.foodly.FDC;

public class FDC_FoodItemDTO {
    /*
    fdcId           unique ID
    description     name of the ingredient
    nutrients:
        nutrientId
        nutrientName
        nutrientNumber  like an id for nutrients
        unitName    G   gramm?
        value   the amount
     */
    private final Long fdcId;
    private final String description;
    private double calories;
    private double fibers;
    private double protein;
    private double carbs;
    private double fats;


    public FDC_FoodItemDTO(Long fdcId, String description, double calories, double fibers, double protein, double carbs, double fats) {
        this.fdcId = fdcId;
        this.description = description;
        this.calories = calories;
        this.fibers = fibers;
        this.protein = protein;
        this.carbs = carbs;
        this.fats = fats;
    }

    public long getFdcId() {
        return fdcId;
    }

    public String getDescription() {
        return description;
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
