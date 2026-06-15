package at.ac.hcw.foodly.FDC;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//purpose:
//1. send a query to the food API
//2. translate any reply into list of ingredient objects
//3. return list?

@RestController
@RequestMapping("/api/search")
public class FDC_SearchController {
    @Autowired
    private FDC_QueryHandler fdcQueryHandler;

    @GetMapping
    public ResponseEntity<List<FDC_FoodItemDTO>> getFoodItem(
            @RequestParam(value = "query", required = false) String searchTerm) {

        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            searchTerm = "";
        }

        return fdcQueryHandler.execute(searchTerm);
    }

    public FDC_SearchController() {

    }
}
