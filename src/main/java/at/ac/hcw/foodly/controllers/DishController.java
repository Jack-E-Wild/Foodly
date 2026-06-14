package at.ac.hcw.foodly.controllers;

import at.ac.hcw.foodly.models.DishModel;
import at.ac.hcw.foodly.models.UserModel;
import at.ac.hcw.foodly.services.DishService;
import at.ac.hcw.foodly.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dish")
public class DishController {
    private final DishService dishService;
    private final UserService userService;

    public DishController(DishService dishService, UserService userService) {
        this.dishService = dishService;
        this.userService = userService;
    }

    //post
    //erstellt ein neues gericht get user
    //braucht: dish name in form von zb name: ramen
    @PostMapping
    public ResponseEntity<DishModel> createDish (@RequestBody Map<String, String> name, Principal principal) {
        String userEmail = principal.getName();
        System.out.println(userEmail);

        UserModel user = userService.findByEmail(userEmail);

        String dishName = name.get("name");
        System.out.println(dishName);

        DishModel newDish = dishService.createNewDish(dishName, user);

        return ResponseEntity.ok(newDish);
    }


    //get mit id
    //holt die dish daten eines spezifischen gerichts
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getDishInformation(@PathVariable Long id){
       DishModel dish = dishService.getDishById(id);

       double totalCalories = dishService.calculateTotalAmountCalories(dish);
       Map<String, Double> macros = dishService.calculateMacroPercentage(dish);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("dish", dish);
        response.put("totalCalories", totalCalories);
        response.put("macroPercentages", macros);


        return ResponseEntity.ok(response);
    }

    //post mit dishId und ingredients
    //fügt ein ingredient/fooditem zum dish hinzu
    //braucht: ganze zutat + amount vom front end (in json)
    @PostMapping("/{dishId}/ingredients")
    public ResponseEntity<DishModel> addIngredienttoDish (@PathVariable Long dishId, @RequestBody Map<String, Object> body){
        if (body.containsKey("id") && body.get("id") != null) {

            Long ingredientId = Long.valueOf(body.get("id").toString());
            double amount = Double.parseDouble(body.get("amount").toString());

            DishModel updatedDish = dishService.addIngredientFromDB(dishId, ingredientId, amount);
            return ResponseEntity.ok(updatedDish);

        } else {

            String name = body.get("name").toString();
            double calories = Double.parseDouble(body.get("calories").toString());
            double fibers = Double.parseDouble(body.get("fibers").toString());
            double protein = Double.parseDouble(body.get("protein").toString());
            double carbs = Double.parseDouble(body.get("carbs").toString());
            double fats = Double.parseDouble(body.get("fats").toString());
            double amount = Double.parseDouble(body.get("amount").toString());

            DishModel updatedDish = dishService.addIngredientFromSearch(dishId, name, calories, fibers, protein, carbs, fats, amount);
            return ResponseEntity.ok(updatedDish);
        }

    }

    //put mit dishId, ingredients
    //ändert den amount
    //braucht: ingredient als json mit dem neuen amount
    @PutMapping("/{dishId}/ingredients")
    public ResponseEntity<DishModel> updateIngredientAmount(@PathVariable Long dishId,
            @RequestBody Map<String, Object> body) {

        Long dishIngredientId = Long.valueOf(body.get("id").toString());
        double newAmount = Double.parseDouble(body.get("amount").toString());

        DishModel updatedDish = dishService.updateAmount(dishId,dishIngredientId, newAmount);
        return ResponseEntity.ok(updatedDish);
    }


    //delete mit dishId, ingredients und dishIngredientID
    //löscht zutat
    //braucht: eigentlich nur den korrekten pfad
    @DeleteMapping("/{dishId}/ingredients/{ingredientId}")
    public ResponseEntity<DishModel> removeIngredientFromDish(@PathVariable Long dishId, @PathVariable Long ingredientId) {
        DishModel updatedDish = dishService.removeIngredientFromDish(dishId,ingredientId);
        return ResponseEntity.ok(updatedDish);
    }

    //delete dishId
    //ganzes gericht ist weg
    //braucht: nur richtigen pfad
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDish(@PathVariable Long id) {
        dishService.deleteDish(id);

        Map<String, String> response = new LinkedHashMap<>();
        response.put("message", "Dish successfully deleted!");
        return ResponseEntity.ok(response);
    }

    //get mit id und makros
    //gibt nur die makros in prozenten zurück für die foodgroup seite
    //braucht: nur dishId im pfad
    @GetMapping("/{id}/macros")
    public ResponseEntity<Map<String, Double>> getDishMacros(@PathVariable Long id) {
        DishModel dish = dishService.getDishById(id);

        Map<String, Double> percentages = dishService.calculateMacroPercentage(dish);

        return ResponseEntity.ok(percentages);
    }

    //patch id
    //ändert nur den namen von gericht wootwoot
    //braucht: nur den neuen namen, also name: newname
    @PatchMapping("/{dishId}")
    public ResponseEntity<DishModel> patchDishName(@PathVariable Long dishId,@RequestBody Map<String, String> body) {

        String newName = body.get("name");
        DishModel updatedDish = dishService.patchName(dishId, newName);

        return ResponseEntity.ok(updatedDish);
    }
}
