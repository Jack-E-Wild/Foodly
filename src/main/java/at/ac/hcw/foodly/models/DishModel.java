package at.ac.hcw.foodly.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dishes")
public class DishModel {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; //TODO: Tova leave this until dish saving -Viktoria hats frühzeitig wieder rein weil viktoria nen grund fürn patch braucht, viktoria will bonuspunkte pls

    // Many Dishes belong to One User
    @ManyToOne(fetch = FetchType.LAZY)
    // LAZY stops Hibernate from loading the whole user every time you just want a dish
    @JoinColumn(name = "user_id", nullable = false) // Creates 'user_id' foreign key column
    private UserModel user;

    // This handles the variable ingredients we established previously
    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DishIngredient> dishIngredients = new ArrayList<>();

    public DishModel() {
    }

    // TODO Tova uncomment when we save/load named dishes -Viktoria sagt: siehe oben bei attribut
    public DishModel(String name, UserModel user) {
        this.name = name;
        this.user = user;
    }



    // Getters and Setters
    public Long getId() {
        return id;
    }

    /*
    //public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    */

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public List<DishIngredient> getDishIngredients() {
        return dishIngredients;
    }

    public void setDishIngredients(List<DishIngredient> dishIngredients) {
        this.dishIngredients = dishIngredients;
    }
}
