package at.ac.hcw.foodly.TMDB;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TMDB_QueryHandler {

    private final RestTemplate restTemplate;

    public TMDB_QueryHandler(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<TMDB_RecipeDTO> callRandomRecipe () {
        TMDB_Response response= restTemplate.getForObject("https://www.themealdb.com/api/json/v1/1/random.php", TMDB_Response.class);
        if (response == null || response.getMeals() == null || response.getMeals().isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 no foods
        }
        Meal meal= response.getMeals().getFirst();
        TMDB_RecipeDTO dto = new TMDB_RecipeDTO(meal.getStrMeal(),meal.getStrMealThumb(), meal.getStrSource());
        return ResponseEntity.ok(dto);
    }
}
