package at.ac.hcw.foodly.FDC;

public class Food {
    private int fdcId; //unique ID
    private String description; //food name
    /*
    nutrients:
        nutrientId
        nutrientName
        nutrientNumber  like an id for nutrients
        unitName    G   gramm?
        value   the amount
     */
    public int getFdcId() {
        return fdcId;
    }

    public void setFdcId(int fdcId) {
        this.fdcId = fdcId;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
