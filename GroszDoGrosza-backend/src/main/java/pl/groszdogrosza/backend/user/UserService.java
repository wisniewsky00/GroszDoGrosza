package pl.groszdogrosza.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
  
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User registerUser(User user) {

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRole("USER");
    return userRepository.save(user);
  }

  public Optional<User> loginUser(String email, String password) {
    Optional<User> user = userRepository.findByEmail(email);

    if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
      return user;
    }

    return Optional.empty();
  }
}