package at.ac.hcw.foodly.models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class DishModel {
    private UUID id;
    private String name;

    private List<DishIngredient> ingredients= new ArrayList<>();
}
