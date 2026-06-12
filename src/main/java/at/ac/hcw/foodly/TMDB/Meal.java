package at.ac.hcw.foodly.TMDB;

public class Meal {
    private String strMeal;
    private String strMealThumb;
    private String strSource;

    public Meal(String strMeal, String strMealThumb, String strSource) {
        this.strMeal = strMeal;
        this.strMealThumb = strMealThumb;
        this.strSource = strSource;
    }

    public String getStrMeal() {
        return strMeal;
    }

    public void setStrMeal(String strMeal) {
        this.strMeal = strMeal;
    }

    public String getStrMealThumb() {
        return strMealThumb;
    }

    public void setStrMealThumb(String strMealThumb) {
        this.strMealThumb = strMealThumb;
    }

    public String getStrSource() {
        return strSource;
    }

    public void setStrSource(String strSource) {
        this.strSource = strSource;
    }
}
