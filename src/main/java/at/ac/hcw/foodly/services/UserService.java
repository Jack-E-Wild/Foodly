package at.ac.hcw.foodly.services;

import at.ac.hcw.foodly.models.UserModel;
import at.ac.hcw.foodly.models.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserModel saveUser(UserModel user)
    {
        String hashedPW = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPW);
        return userRepository.save(user);
    }

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel findByEmail(String email) {
        UserModel user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("User mit der E-Mail " + email + " nicht gefunden");
        }
        return user;
    }

    public Optional<UserModel> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public String getGravatarURL(Long id) {
        String email = getUserById(id)
                .map(UserModel::getEmail)
                .map(String::toLowerCase)
                .orElse("monsterid");
        String hash = GravatarService.sha256Hex(email);
        String gravatarURL = "https://gravatar.com/avatar/" + hash;
        return gravatarURL;
    }
}
