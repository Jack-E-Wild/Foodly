package at.ac.hcw.foodly.FDC;

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
        // some fake query to get a reply
        FDC_Response response = restTemplate.getForObject("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=91aDcNFIoZ278Eqby09w1GJUU26ZJNPdT9bZjvkq&query=tuna", FDC_Response.class);
        if (response == null || response.getFoods() == null || response.getFoods().isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 no foods
        }
        Food firstEntry = response.getFoods().get(0);
        return ResponseEntity.ok(new FDC_FoodItemDTO(firstEntry.getFdcId(), firstEntry.getDescription()));
    }
}
