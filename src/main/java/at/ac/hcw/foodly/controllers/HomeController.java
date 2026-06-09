package at.ac.hcw.foodly.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HomeController {
    @RequestMapping("/")

    public String getIndex() {
        return "index.html";
    }

    @RequestMapping("/cooking")
    @GetMapping
    public String getCooking() {
        return "cooking.html";
    }
}
