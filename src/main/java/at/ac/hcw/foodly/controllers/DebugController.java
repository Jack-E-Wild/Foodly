package at.ac.hcw.foodly.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/config")
public class DebugController {

    @Value("${app.debug.enabled:false}")
    private boolean debugEnabled;

    @GetMapping("/debug-status")
    public Map<String, Boolean> getDebugStatus() {
        return Map.of("debugEnabled", debugEnabled);
    }
}

