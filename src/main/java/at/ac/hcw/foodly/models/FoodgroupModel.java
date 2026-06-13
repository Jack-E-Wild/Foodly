package at.ac.hcw.foodly.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name= "food_groups")
public class FoodgroupModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fgName;
    private String fgIcon;


    @ManyToMany(mappedBy = "foodGroups")
    private List<IngredientModel> ingredients;

    public FoodgroupModel(String fgName, String fgIcon) {
        this.fgName = fgName;
        this.fgIcon = fgIcon;
    }

    public Long getId () {return id;}

    public void setFgName(String fgName) {
        this.fgName = fgName;
    }

    public void setFgIcon(String fgIcon) {
        this.fgIcon = fgIcon;
    }

    public String getFgName() {
        return fgName;
    }

    public String getFgIcon() {
        return fgIcon;
    }

    public List<IngredientModel> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientModel> ingredients) {
        this.ingredients = ingredients;
    }
}
