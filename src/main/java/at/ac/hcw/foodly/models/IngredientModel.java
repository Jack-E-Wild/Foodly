package at.ac.hcw.foodly.models;

import jakarta.persistence.*;
import at.ac.hcw.foodly.models.DishModel;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@Entity
public class IngredientModel {
    @Id
    private UUID id;
    private String ingrName;
    private String fgName;
    private String fgIcon;

    // This is the "dish" property Hibernate is looking for!
    @ManyToOne
    @JoinColumn(name = "dish_id") // Maps the foreign key column in the DB
    private DishModel dish;

    public IngredientModel(){
        this.id = UUID.randomUUID();
    }

    public IngredientModel(String ingrName, String fgName, String fgIcon) {
        this();
        this.ingrName = ingrName;
        this.fgName = fgName;
        this.fgIcon = fgIcon;
    }

    public UUID getId() {
        return id;
    }

    public String getIngrName() {
        return ingrName;
    }

    public String getFgName() {
        return fgName;
    }

    public String getFgIcon() {
        return fgIcon;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setIngrName(String ingrName) {
        this.ingrName = ingrName;
    }

    public void setFgName(String fgName) {
        this.fgName = fgName;
    }

    public void setFgIcon(String fgIcon) {
        this.fgIcon = fgIcon;
    }

    public DishModel getDish() {
        return dish;
    }

    public void setDish(DishModel dish) {
        this.dish = dish;
    }
}
