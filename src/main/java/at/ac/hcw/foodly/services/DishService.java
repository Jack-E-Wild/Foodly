package at.ac.hcw.foodly.services;

import at.ac.hcw.foodly.models.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DishService {
    private final DishRepository dishRepository;
    private final IngredientRepository ingredientRepository;
    private final DishIngredientRepository dishIngredientRepository;

    public DishService(DishRepository dishRepository, IngredientRepository ingredientRepository, DishIngredientRepository dishIngredientRepository) {
        this.dishRepository = dishRepository;
        this.ingredientRepository = ingredientRepository;
        this.dishIngredientRepository = dishIngredientRepository;
    }

    //create new dish
    public DishModel createNewDish (String name, UserModel user){
        DishModel newDishmodel= new DishModel(name, user);
        return dishRepository.save(newDishmodel);
    }

    //ein spezifisches gericht zurück geben mit allen infos
    public DishModel getDishById (Long id) {
        return dishRepository.findById(id).orElseThrow(() ->new EntityNotFoundException("Dish not found"));
    }

    //add db ingredient
    public DishModel addIngredientFromDB (Long dishId, Long ingredientId, double amount) {
        DishModel dish = dishRepository.findById(dishId).orElseThrow(()-> new EntityNotFoundException("Dish not found"));

        IngredientModel ingredient = ingredientRepository.findById(ingredientId).orElseThrow(()->new EntityNotFoundException("Ingredient not found"));

        //neues DishIngredient erstellt und verknüpft für db
        DishIngredient dishIngredient = new DishIngredient(ingredient,amount);
        dishIngredient.setDish(dish);
        dish.getDishIngredients().add(dishIngredient);

        return dishRepository.save(dish);
    }

    //add foodgroup ingredient
    public DishModel addIngredientFromSearch(Long dishId,String name, double calories, double fibers, double protein, double carbs, double fats, double amount){
        DishModel dish = dishRepository.findById(dishId).orElseThrow(()-> new EntityNotFoundException("Dish not found"));

        DishIngredient customDishIngredient = new DishIngredient(name, calories, fibers, protein, carbs, fats, amount);
        customDishIngredient.setDish(dish);
        dish.getDishIngredients().add(customDishIngredient);

        return dishRepository.save(dish);
    }

    //change amount
    public DishModel updateAmount (Long dishId, Long dishIngredientId, double newAmount){
        DishModel dish = dishRepository.findById(dishId).orElseThrow(()-> new EntityNotFoundException("Dish not found"));

        DishIngredient dishIngredient = dish.getDishIngredients().stream()
                .filter(dIng -> dIng.getId().equals(dishIngredientId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Ingredient not found in this dish"));

        dishIngredient.setAmountInGrams(newAmount);

        return dishRepository.save(dish);
    }

    //change name
    public DishModel patchName (Long dishId, String newName){
        DishModel dish = dishRepository.findById(dishId).orElseThrow(()-> new EntityNotFoundException("Dish not found"));

        dish.setName(newName);

        return dishRepository.save(dish);
    }

    //remove ingredient
    public DishModel removeIngredientFromDish(Long dishId, Long dishIngredientId) {
        DishModel dish = dishRepository.findById(dishId).orElseThrow(() -> new EntityNotFoundException("Dish not found"));

        dish.getDishIngredients().removeIf(dIng -> dIng.getId().equals(dishIngredientId));

        return dishRepository.save(dish);
    }


    //MAKRO Berechnungen

    public double calculateTotalAmountCalories (Long dishId){
        DishModel dish = dishRepository.findById(dishId).orElseThrow(()-> new EntityNotFoundException("Dish not found"));

        return dish.getDishIngredients().stream()
                .mapToDouble(dIng -> (dIng.getCalories() * dIng.getAmountInGrams()) / 100.0)
                .sum();
    }

    public Map<String, Double> calculateMacroPercentage (Long dishId){
        DishModel dish = dishRepository.findById(dishId).orElseThrow(()-> new EntityNotFoundException("Dish not found"));

        double totalProteins = 0;
        double totalFibers = 0;
        double totalCarbs = 0;
        double totalFats = 0;

        for (DishIngredient dIng : dish.getDishIngredients()) {
            totalProteins += (dIng.getProtein() * dIng.getAmountInGrams()) / 100.0;
            totalFibers += (dIng.getFibers() * dIng.getAmountInGrams()) / 100.0;
            totalCarbs += (dIng.getCarbs() * dIng.getAmountInGrams()) / 100.0;
            totalFats += (dIng.getFats() * dIng.getAmountInGrams()) / 100.0;
        }

        double totalAmountOfMacros = totalProteins + totalFibers + totalFats + totalCarbs;

        Map<String, Double> percentages = new HashMap<>();
        if (totalAmountOfMacros == 0) {
            percentages.put("proteins", 0.0);
            percentages.put("fibers", 0.0);
            percentages.put("carbs", 0.0);
            percentages.put("fats", 0.0);
            return percentages;
        }

        //gerundet auf eine nachkommastelle
        percentages.put("proteins", Math.round((totalProteins / totalAmountOfMacros) * 100.0 * 10.0) / 10.0);
        percentages.put("fibers", Math.round((totalFibers / totalAmountOfMacros) * 100.0 * 10.0) / 10.0);
        percentages.put("carbs", Math.round((totalCarbs / totalAmountOfMacros) * 100.0 * 10.0) / 10.0);
        percentages.put("fats", Math.round((totalFats / totalAmountOfMacros) * 100.0 * 10.0) / 10.0);
        return percentages;
    }



}
