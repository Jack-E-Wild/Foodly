package at.ac.hcw.foodly.controllers;

import at.ac.hcw.foodly.models.FoodgroupModel;
import at.ac.hcw.foodly.models.FoodgroupRepository;
import at.ac.hcw.foodly.models.IngredientModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foodgroups")
@CrossOrigin(origins =  "*")
public class FoodgroupController {
    private FoodgroupRepository repository;

    public FoodgroupController(FoodgroupRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<FoodgroupModel>> getAllFoodgroups() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}/ingredients")
    public ResponseEntity<List<IngredientModel>> getFoodgroupIngredients(@PathVariable Long id) {
        return repository.findById(id)
                .map(group -> ResponseEntity.ok(group.getIngredients()))
                .orElse(ResponseEntity.notFound().build());
    }
}
