package at.ac.hcw.foodly.services;

import at.ac.hcw.foodly.models.UserModel;
import at.ac.hcw.foodly.models.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Look up the user in the actual H2 database file
        UserModel user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found in database: " + email);
        }

        // Return Spring Security's user format backed by your H2 data
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(), // This must be the hashed password from the DB
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
        );
    }

}
