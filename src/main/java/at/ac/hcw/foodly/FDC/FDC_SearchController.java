package at.ac.hcw.foodly.FDC;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

    //purpose:
    //1. send a query to the food API
    //2. translate any reply into list of ingredient objects
    //3. return list?

@RestController
@RequestMapping("/api/public/search") //TODO: tova change this to /api/search once it works oder so
public class FDC_SearchController {
    @Autowired
    private FDC_QueryHandler fdcQueryHandler;

    @GetMapping
    public ResponseEntity<FDC_FoodItemDTO> getFoodItem(){
        return fdcQueryHandler.execute(null);
    }

    public FDC_SearchController() {

    }
}
