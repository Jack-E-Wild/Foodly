package at.ac.hcw.foodly.models;


public class DishIngredient {
    //irgendeine ID, falls wir jpa verwenden dann @id
    // private Long id oder UUID id

    private String name;
    private double calories;
    private double fibers;
    private double protein;
    private double carbs;
    private double fats;

    private double amountInGrams;


    public DishIngredient(String name, double calories, double fibers, double protein, double carbs, double fats, double amountInGrams) {
        this.name = name;
        this.calories = calories;
        this.fibers = fibers;
        this.protein = protein;
        this.carbs = carbs;
        this.fats = fats;
        this.amountInGrams = amountInGrams;
    }

    public DishIngredient(IngredientModel ingredient, double amountInGrams){
        this.name = ingredient.getIngrName();
        this.calories = ingredient.getCalories();
        this.fibers = ingredient.getFibers();
        this.protein = ingredient.getProtein();
        this.carbs = ingredient.getCarbs();
        this.fats = ingredient.getFats();

        this.amountInGrams = amountInGrams;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public double getAmountInGrams() {
        return amountInGrams;
    }

    public void setAmountInGrams(double amountInGrams) {
        this.amountInGrams = amountInGrams;
    }
}
