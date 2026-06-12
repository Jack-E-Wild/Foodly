package at.ac.hcw.foodly.models;

import at.ac.hcw.foodly.DatabaseUtil;
import at.ac.hcw.foodly.exceptions.DatabaseException;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class IngredientRepository {

    public IngredientModel findById (UUID id){
        IngredientModel ingredient = new IngredientModel();
        String sql = "SELECT * FROM ingredients WHERE id = ?";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement prStatement = conn.prepareStatement(sql);
        ) {
           prStatement.setObject(1, id);

            try (ResultSet rs = prStatement.executeQuery()) {
                if (rs.next()) {

                    ingredient.setId((UUID) rs.getObject("id"));
                    ingredient.setIngrName(rs.getString("name"));
                    ingredient.setFgName(rs.getString("foodgroup"));
                    // hier restliche attribute von ingredients objekt befüllen, sobald setter vorhanden

                    return ingredient;
                }
            }

            return null;
        } catch (SQLException e) {
            throw new DatabaseException("Could not retrieve ingredient", e);
        }
    }


    public List<IngredientModel> findAll() {
        List<IngredientModel> ingredients = new ArrayList<>();
        String sqlList = "SELECT * FROM ingredients";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement prStatement = conn.prepareStatement(sqlList);
        ) {
            ResultSet rsIngredients = prStatement.executeQuery();
            while (rsIngredients.next()) {
                UUID id = rsIngredients.getObject("id", UUID.class);
                String ingrName = rsIngredients.getString("name");
                String fgName = rsIngredients.getString("foodgroup");
                String fgIcon = rsIngredients.getString("icon");
                IngredientModel ingredient = new IngredientModel(ingrName, fgName);
                ingredient.setId(id);
                ingredients.add(ingredient);
            }
            return ingredients;
        } catch (SQLException e) {
            throw new DatabaseException("Could not retrieve ingredients", e);
        }
    }

    public List<FoodgroupModel> listFoodgroups() {
        List<FoodgroupModel> foodgroups = new ArrayList<>();
        String sqlList = "SELECT foodgroup FROM ingredients";

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement preStatement = conn.prepareStatement(sqlList);
        ) {
            ResultSet rsFoodgroups = preStatement.executeQuery();
            while (rsFoodgroups.next()) {
                String fgName = rsFoodgroups.getString("foodgroup");
                String fgIcon = rsFoodgroups.getString("icon");
                FoodgroupModel foodgroup = new FoodgroupModel(fgName, fgIcon);
                foodgroups.add(foodgroup);
            }
            return foodgroups;
        } catch (
                SQLException e) {
            throw new DatabaseException("Could not retrieve foodgroups", e);
        }
    }
}