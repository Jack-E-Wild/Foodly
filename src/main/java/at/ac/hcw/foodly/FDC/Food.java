package at.ac.hcw.foodly.FDC;

import java.util.List;

public class Food {
    private Long fdcId; //unique ID
    private String description;//food name
    private List<Nutrient> foodNutrients; //nutrient list für makros
    /*
    nutrients:
        nutrientId
        nutrientName
        nutrientNumber  like an id for nutrients
        unitName    G   gramm?
        value   the amount
     */
    public Long getFdcId() {
        return fdcId;
    }

    public void setFdcId(Long fdcId) {
        this.fdcId = fdcId;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public List<Nutrient> getFoodNutrients() {
        return foodNutrients;
    }

    public void setFoodNutrients(List<Nutrient> foodNutrients) {
        this.foodNutrients = foodNutrients;
    }
}
