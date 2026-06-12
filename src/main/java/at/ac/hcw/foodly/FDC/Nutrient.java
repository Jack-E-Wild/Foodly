package at.ac.hcw.foodly.FDC;

public class Nutrient {
    private String nutrientName; // zb protein
    private double value;        // und der wert

    public String getNutrientName() {
        return nutrientName;
    }

    public void setNutrientName(String nutrientName) {
        this.nutrientName = nutrientName;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
