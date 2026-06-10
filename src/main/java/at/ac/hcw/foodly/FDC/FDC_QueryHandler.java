package at.ac.hcw.foodly.FDC;

import at.ac.hcw.foodly.FDC.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

//    @Value("${api.key}")
//  private String apiKey;
// foodDB_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + apiKey + "&query=" + query


@Service
public class FDC_QueryHandler implements Query<Void, FDC_FoodItemDTO> {

    private final RestTemplate restTemplate;

    public FDC_QueryHandler(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ResponseEntity<FDC_FoodItemDTO> execute(Void input) {
        FDC_FoodItem foodItem = restTemplate.getForObject("https://api.nal.usda.gov/fdc/v1/foods/search?", FDC_FoodItem.class);
        FDC_FoodItemDTO foodItemDTO = new FDC_FoodItemDTO(foodItem.getFoodItem());
        return ResponseEntity.ok(foodItemDTO);
    }
}
