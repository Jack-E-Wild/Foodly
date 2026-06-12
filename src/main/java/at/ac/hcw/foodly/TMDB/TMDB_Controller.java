package at.ac.hcw.foodly.TMDB;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/random-recipe")
public class TMDB_Controller {
    private TMDB_QueryHandler tmdbQueryHandler;

    @GetMapping
    public ResponseEntity<TMDB_RecipeDTO> getRandomRecipe(){
        return tmdbQueryHandler.callRandomRecipe();
    }

    public TMDB_Controller(TMDB_QueryHandler tmdbQueryHandler) {
        this.tmdbQueryHandler = tmdbQueryHandler;
    }
}
