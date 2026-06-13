package at.ac.hcw.foodly.models;

import org.springframework.data.jpa.repository.JpaRepository;
import at.ac.hcw.foodly.models.DishModel;

public interface DishRepository extends JpaRepository<DishModel, Long> {

}
