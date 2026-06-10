package at.ac.hcw.foodly.FDC;



//this is the thing we get back from FDC api
//@Data this doesn't work as we don't have lombok.Data

public class FDC_FoodItem {
    public String getFoodItem() {
        return foodItem;
    }

    private String foodItem;
}
