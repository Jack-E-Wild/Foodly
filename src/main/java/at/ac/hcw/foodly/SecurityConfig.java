package at.ac.hcw.foodly;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
/*
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
*/
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
/*
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user1 = User.withDefaultPasswordEncoder()
                .username("jane doe") //wir werden hier wahrscheinlich auf emails umstellen müssen
                .password("123")
                .roles("USER")
                .build();

        UserDetails user2 = User.withDefaultPasswordEncoder()
                .username("john")
                .password("456")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user1, user2);
    }
*/

    // Security rules
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable()) // erlaubt restcalls
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**", "/error/**").permitAll() //löschen am Ende
                        .requestMatchers("/index.html", "/index.js", "/css/**").permitAll() // startseite muss man anpassen
                        .requestMatchers("/api/public/**", "/").permitAll()                     // andere öffentliche endpunkte
                        .anyRequest().authenticated()                                      // ALLES andere braucht einen Login!
                )
                .formLogin(form -> form
                        .loginPage("/index.html")
                        .loginProcessingUrl("/api/login") // hier her sollte front end login schicken
                        .successHandler((req, res, auth) -> res.setStatus(200))
                        .failureHandler((req, res, exp) -> res.setStatus(401))
                )
                .logout(logout -> logout
                        .logoutUrl("/api/logout") //front end logout enpoint
                        .logoutSuccessHandler((req, res, auth) -> res.setStatus(200))
                ).headers(headers -> headers
                        // 1. Disable the old X-Frame-Options header
                        .frameOptions(frameOptions -> frameOptions.disable())
                        // 2. Add Content Security Policy to allow specific parent domains
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives("frame-ancestors 'self' https://trusted-parent-domain.com")
                        )
                );

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}