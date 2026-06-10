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
    private final long fdcId;
    private final String description;

    public FDC_FoodItemDTO(long fdcId, String description){
        this.fdcId = fdcId;
        this.description = description;
    }

    public long getFdcId() {
        return fdcId;
    }

    public String getDescription() {
        return description;
    }
}
