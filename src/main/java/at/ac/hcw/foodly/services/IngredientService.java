package at.ac.hcw.foodly.services;

import at.ac.hcw.foodly.models.IngredientModel;
import at.ac.hcw.foodly.models.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class IngredientService {

    private IngredientRepository repository;

    public IngredientService(IngredientRepository repository) {
        this.repository = repository;
    }

    public List<IngredientModel> getAllRequest() {
        return repository.findAll();
    }


    public IngredientModel getIngredientById (UUID id){
        return repository.findById(id);
    }

}
