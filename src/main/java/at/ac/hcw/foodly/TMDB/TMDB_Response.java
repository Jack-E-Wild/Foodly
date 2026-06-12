package at.ac.hcw.foodly.TMDB;

import java.util.List;

public class TMDB_Response {
    private List<Meal> meals;

    public List<Meal> getMeals() {return meals;}

    public void setMeals(List<Meal> meal) {this.meals = meal;}
}
