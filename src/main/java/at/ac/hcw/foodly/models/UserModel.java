package at.ac.hcw.foodly.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String password;
    private String role = "ROLE_USER"; //default role for new user

    private String name;
    private String email;

    // One User can have Many Dishes
    // 'mappedBy = "user"' tells JPA that the 'user' field in the Dish class owns the relationship
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<DishModel> dishes = new ArrayList<>();

    public UserModel() {
    }

    // Helper method to synchronize both sides of the relationship safely
    public void addDish(DishModel dish) {
        dishes.add(dish);
        dish.setUser(this); // Set the back-reference
    }

    public void removeDish(DishModel dish) {
        dishes.remove(dish);
        dish.setUser(null);
    }

    public Long getId() {
        return id;
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<DishModel> getDishes() {
        return dishes;
    }

    public void setDishes(List<DishModel> dishes) {
        this.dishes = dishes;
    }
}