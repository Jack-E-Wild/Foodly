package at.ac.hcw.foodly.config;

import at.ac.hcw.foodly.models.FoodgroupModel;
import at.ac.hcw.foodly.models.FoodgroupRepository;
import at.ac.hcw.foodly.models.IngredientModel;
import at.ac.hcw.foodly.models.IngredientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

//
// ACHTUNG !!! REIHENFOLGE BEACHTEN  foodgroup -> ingredient, user -> dish
//

@Component
public class DataInitializer implements CommandLineRunner {
    private FoodgroupRepository foodgroupRepository;
    private IngredientRepository ingredientRepository;

    public DataInitializer(FoodgroupRepository foodgroupRepository, IngredientRepository ingredientRepository) {
        this.foodgroupRepository = foodgroupRepository;
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public void run (String... args) throws Exception {
        //Foodgroups

        //umständlich für wir machen objekt in dem wir ein objekt machen
        //weil das objekt erst die id beim erstellen in der datenbank bekommt
        FoodgroupModel proteins = foodgroupRepository
                .save(new FoodgroupModel("Proteins","src/main/resources/static/images/testicon.png"));
        FoodgroupModel fibers = foodgroupRepository
                .save(new FoodgroupModel("Fibers","src/main/resources/static/images/testicon.png"));
        FoodgroupModel carbs = foodgroupRepository
                .save(new FoodgroupModel("Carbs","src/main/resources/static/images/testicon.png"));
        FoodgroupModel fats = foodgroupRepository
                .save(new FoodgroupModel("Fats","src/main/resources/static/images/testicon.png"));

        //Ingredients

        IngredientModel beans = new IngredientModel(
                "Beans",
                111,
                0.6,
                14.5,
                8.5,
                7.7);
        beans.setFoodGroups(List.of(proteins, fibers, carbs));
        IngredientModel lentils = new IngredientModel(
                "Dried Lentils",
                324,
                1.5,
                44.8,
                17,
                24.4);
        lentils.setFoodGroups(List.of(proteins, fibers));
        IngredientModel avocado = new IngredientModel(
                "Avocado",
                158,
                15.1,
                1.2,
                5.5,
                1.6);
        avocado.setFoodGroups(List.of(fats, fibers));
        IngredientModel peanutbutter = new IngredientModel(
                "Peanutbuter",
                636,
                50.8,
                12.5,
                7.6,
                26.1);
        peanutbutter.setFoodGroups(List.of(proteins, fats, fibers));
        IngredientModel egg = new IngredientModel(
                "Egg",
                140,
                9.8,
                0.3,
                0,
                12.6);
        egg.setFoodGroups(List.of(proteins));
        IngredientModel rice = new IngredientModel(
                "Dry Rice",
                356,
                1,
                78.6,
                1.3,
                7.5);
        lentils.setFoodGroups(List.of(carbs));
        IngredientModel sesameOil = new IngredientModel(
                "Sesame Oil",
                900,
                100,
                0,
                0,
                0);
        sesameOil.setFoodGroups(List.of(fats));





        ingredientRepository.save(beans);
        ingredientRepository.save(lentils);
        ingredientRepository.save(avocado);
        ingredientRepository.save(peanutbutter);
        ingredientRepository.save(sesameOil);

        System.out.println("Datenbank befüllt");

    }

}
