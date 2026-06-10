package at.ac.hcw.foodly.FDC;

import java.util.List;

//this is the thing we get back from FDC api
public class FDC_Response {
//    private String foodItem;
    private List<Food> foods;

    public List<Food> getFoods(){
        return foods;
    }

    public void setFoods(List<Food> foods){
        this.foods = foods;
    }

}

