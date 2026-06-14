package at.ac.hcw.foodly.models;


import jakarta.persistence.*;

@Entity
public class DishIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // This is the "dish" property for the Hibernate database
    @ManyToOne
    @JoinColumn(name = "dish_id") // Maps the foreign key column in the DB
    private DishModel dish;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = true)
    private IngredientModel ingredient;

    private String dName;
    private double dCalories;
    private double dFibers;
    private double dProtein;
    private double dCarbs;
    private double dFats;

    private double amountInGrams;

    public DishIngredient() {
    }

    //Constructor für FDC_FoodItems
    public DishIngredient(String name, double calories, double fibers, double protein, double carbs, double fats, double amountInGrams) {
        this.dName = name;
        this.dCalories = calories;
        this.dFibers = fibers;
        this.dProtein = protein;
        this.dCarbs = carbs;
        this.dFats = fats;
        this.amountInGrams = amountInGrams;
    }

    //Constructor für Db Ingredients
    public DishIngredient(IngredientModel ingredient, double amountInGrams){
        this.ingredient = ingredient;
        this.amountInGrams = amountInGrams;
    }

    public String getName() {
        return (this.ingredient != null) ? this.ingredient.getIngrName() : this.dName;
    }

    public void setName(String name) {
        this.dName = name;
    }

    public double getCalories() {
        return (this.ingredient != null) ? this.ingredient.getCalories() : this.dCalories;
    }

    public void setCalories(double calories) {
        this.dCalories = calories;
    }

    public double getFibers() {
        return (this.ingredient != null) ? this.ingredient.getFibers() : this.dFibers;
    }

    public void setFibers(double fibers) {
        this.dFibers = fibers;
    }

    public double getProtein() {
        return (this.ingredient != null) ? this.ingredient.getProtein() : this.dProtein;
    }

    public void setProtein(double protein) {
        this.dProtein = protein;
    }

    public double getCarbs() {
        return (this.ingredient != null) ? this.ingredient.getCarbs() : this.dCarbs;
    }

    public void setCarbs(double carbs) {
        this.dCarbs = carbs;
    }

    public double getFats() {
        return (this.ingredient != null) ? this.ingredient.getFats() : this.dFats;
    }

    public void setFats(double fats) {
        this.dFats = fats;
    }

    public double getAmountInGrams() {
        return amountInGrams;
    }

    public void setAmountInGrams(double amountInGrams) {
        this.amountInGrams = amountInGrams;
    }

    public Long getId() {
        return id;
    }

    public DishModel getDish() {
        return dish;
    }

    public void setDish(DishModel dish) {
        this.dish = dish;
    }

    public IngredientModel getIngredient() {
        return ingredient;
    }

    public void setIngredient(IngredientModel ingredient) {
        this.ingredient = ingredient;
    }
}
