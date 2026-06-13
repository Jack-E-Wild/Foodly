package at.ac.hcw.foodly.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import at.ac.hcw.foodly.models.DishModel;

import java.util.List;
import java.util.UUID;

@Entity
public class IngredientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ingrName;
    private double calories;
    private double fibers;
    private double protein;
    private double carbs;
    private double fats;

    //Frage: sollte nicht dishIngredient mit dish verknüpft sein?
    // This is the "dish" property Hibernate is looking for!
//    @ManyToOne
//    @JoinColumn(name = "dish_id") // Maps the foreign key column in the DB
//    private DishModel dish;

    //This is the "foodGroups" property Hibernate is looking for
    @ManyToMany
    @JoinTable(
            name = "ingredient_food_group", // Name der Join Zwischentabelle
            joinColumns = @JoinColumn(name = "ingredient_id"),
            inverseJoinColumns = @JoinColumn(name = "food_group_id")
    )
    @JsonIgnore
    private List<FoodgroupModel> foodGroups;

    //Hibernate braucht leere konstruktor
    public IngredientModel() {
    }

    public IngredientModel(String ingrName, double calories, double fats, double carbs,double fibers, double protein) {
        this.fats = fats;
        this.carbs = carbs;
        this.protein = protein;
        this.fibers = fibers;
        this.calories = calories;
        this.ingrName = ingrName;
    }

    public Long getId() {
        return id;
    }

    public String getIngrName() {
        return ingrName;
    }

    public void setIngrName(String ingrName) {
        this.ingrName = ingrName;
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

//    public DishModel getDish() {
//        return dish;
//    }
//
//    public void setDish(DishModel dish) {
//        this.dish = dish;
//    }

    public List<FoodgroupModel> getFoodGroups() {
        return foodGroups;
    }

    public void setFoodGroups(List<FoodgroupModel> foodGroups) {
        this.foodGroups = foodGroups;
    }
}
