package at.ac.hcw.foodly.FDC;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

//    @Value("${api.key}")
//  private String apiKey;
// foodDB_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + apiKey + "&query=" + query

// zum einschränken der rückgabe: https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=10&pageNumber=1&api_key=EUER_KEY

@Service
public class FDC_QueryHandler implements Query<String, List<FDC_FoodItemDTO>> {

    private final RestTemplate restTemplate;
//    @Value("{api.key}") geht nicht weil kein ultimate?
    private String apiKey = "91aDcNFIoZ278Eqby09w1GJUU26ZJNPdT9bZjvkq";

    public FDC_QueryHandler(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ResponseEntity<List<FDC_FoodItemDTO>> execute(String query) {
        // some fake query to get a reply
        FDC_Response response = restTemplate.getForObject("https://api.nal.usda.gov/fdc/v1/foods/search?api_key="+apiKey+"&query="+query+"&pageSize=10&pageNumber=1", FDC_Response.class);
        if (response == null || response.getFoods() == null || response.getFoods().isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 no foods
        }
        List<FDC_FoodItemDTO> dtoList = new ArrayList<>();

        for (Food food : response.getFoods()) {
            double calories = extractNutrientValue(food, "Energy");
            double protein = extractNutrientValue(food, "Protein");
            double fat = extractNutrientValue(food, "Total lipid (fat)");
            double carbs = extractNutrientValue(food, "Carbohydrate, by difference");
            double fiber = extractNutrientValue(food, "Fiber, total dietary");

            FDC_FoodItemDTO dto = new FDC_FoodItemDTO(
                    food.getFdcId(),
                    food.getDescription(),
                    calories,
                    protein,
                    fat,
                    carbs,
                    fiber );

            dtoList.add(dto);
        }
        return ResponseEntity.ok(dtoList);
//        Food firstEntry = response.getFoods().get(0);
//        return ResponseEntity.ok(new FDC_FoodItemDTO(firstEntry.getFdcId(), firstEntry.getDescription()));
    }

    private double extractNutrientValue(Food food, String nutrientName) {
        if (food.getFoodNutrients() == null) return 0.0;

        //geht durch alle nutrients durch und gibt nur den value des gesuchten aus
        return food.getFoodNutrients().stream()
                .filter(n -> n.getNutrientName().equalsIgnoreCase(nutrientName))
                .mapToDouble(Nutrient::getValue)
                .findFirst()
                .orElse(0.0);
    }
}
