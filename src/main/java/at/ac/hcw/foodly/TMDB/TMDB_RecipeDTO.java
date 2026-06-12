package at.ac.hcw.foodly.TMDB;

public class TMDB_RecipeDTO {
    private String recipeName;
    private String recipethumbnail;
    private String recipeLink;

    public TMDB_RecipeDTO(String recipeName, String recipethumbnail, String recipeLink) {
        this.recipeName = recipeName;
        this.recipethumbnail = recipethumbnail;
        this.recipeLink = recipeLink;
    }

    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public String getRecipethumbnail() {
        return recipethumbnail;
    }

    public void setRecipethumbnail(String recipethumbnail) {
        this.recipethumbnail = recipethumbnail;
    }

    public String getRecipeLink() {
        return recipeLink;
    }

    public void setRecipeLink(String recipeLink) {
        this.recipeLink = recipeLink;
    }
}
