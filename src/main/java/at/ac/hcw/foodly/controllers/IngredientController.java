package at.ac.hcw.foodly.controllers;

import at.ac.hcw.foodly.models.IngredientModel;
import at.ac.hcw.foodly.models.IngredientRepository;
import at.ac.hcw.foodly.services.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    private IngredientRepository ingredientRepository;

    private IngredientService ingredientService;

    public IngredientController(IngredientRepository ingredientRepository, IngredientService ingredientService) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public ResponseEntity<List<IngredientModel>> getIngredients(){
        return ResponseEntity.ok(ingredientService.getAllRequest());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientModel> getIngredient(@PathVariable UUID id){
        return ResponseEntity.ok(ingredientService.getIngredientById(id));
    }


}
