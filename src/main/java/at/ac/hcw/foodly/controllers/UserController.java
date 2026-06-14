package at.ac.hcw.foodly.controllers;

import at.ac.hcw.foodly.models.UserModel;
import at.ac.hcw.foodly.models.DishModel;
import at.ac.hcw.foodly.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserModel createUser(@RequestBody UserModel user) {
        return userService.saveUser(user);
    }

    @GetMapping
    public List<UserModel> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @GetMapping("/avatar")
    public ResponseEntity<?> getGravatarURL(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No active session");
        }
        String avatarURL = userService.getGravatarURL(principal.getName());
        Map<String, Object> profilePic = new HashMap<>();
        profilePic.put("avatar", avatarURL);
        return ResponseEntity.ok(profilePic);
    }

    // POST http://localhost:8080/api/users/1/dishes
    // Payload: {"name": "Spaghetti Carbonara"}
    @PostMapping("/{userId}/dishes")
    public UserModel addDishToUser(@PathVariable Long userId, @RequestBody DishModel newDish) {
        // 1. Fetch the user who is creating the dish

        UserModel user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Use our helper method to bind the user and dish together
        user.addDish(newDish);

        // 3. Save the user. Because of CascadeType.ALL, the new dish is inserted into the DB too!
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
    }
}
