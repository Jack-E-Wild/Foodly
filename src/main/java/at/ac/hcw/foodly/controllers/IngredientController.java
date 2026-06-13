package at.ac.hcw.foodly.controllers;

import at.ac.hcw.foodly.models.IngredientModel;
import at.ac.hcw.foodly.models.IngredientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins =  "*")
public class IngredientController {

    private IngredientRepository ingredientRepository;


    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping
    public ResponseEntity<List<IngredientModel>> getIngredients(){
        //for testing
        //return ResponseEntity.ok((List<T>) List.of("Tuna", "Apple", "Sausage"));

        return ResponseEntity.ok(ingredientRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientModel> getIngredient(@PathVariable Long id){
        return ingredientRepository.findById(id)
                .map(ingredient -> ResponseEntity.ok(ingredient))
                .orElse(ResponseEntity.notFound().build());
    }


}
