package at.ac.hcw.foodly.services;

import at.ac.hcw.foodly.models.DishModel;
import at.ac.hcw.foodly.models.DishIngredient;
import at.ac.hcw.foodly.models.DishRepository;

import java.util.List;
import java.util.Optional;


public class DishService {
    private DishRepository dishRepository;
    private DishModel dish;
    /*
    	getMakros() fuer ingredients
		delete dish
		post (new dish)
		Get makros current dish
    */
    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }
    public DishModel saveDish(DishModel dish){
        return dishRepository.save(dish);
    }

    public List<DishModel> getAllDishes(){
        return dishRepository.findAll();
    }

    public Optional<DishModel> getDishById(Long id){
        return dishRepository.findById(id);
    }

    public void deleteDishById(Long id){
        dishRepository.deleteById(id);
    }

}
