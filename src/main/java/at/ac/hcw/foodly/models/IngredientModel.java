package at.ac.hcw.foodly.models;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

public class IngredientModel {
    private UUID id;
    private String ingrName;
    private String fgName;
    private String fgIcon;

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
}
