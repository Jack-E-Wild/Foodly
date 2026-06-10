package at.ac.hcw.foodly.FDC;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@org.springframework.context.annotation.Configuration
public class Configuration {

    @Bean
    RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
