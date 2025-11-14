package pl.groszdogrosza.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.groszdogrosza.backend.dto.LoginRequest;
import pl.groszdogrosza.backend.dto.LoginResponse;
import pl.groszdogrosza.backend.dto.RegisterRequest;

import java.util.Map;
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

  public ResponseEntity<?> register(RegisterRequest registerRequest) {

    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", "Email already in use"));
    } else if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", "Username already in use"));
    }

    User user = new User();
    user.setUsername(registerRequest.getUsername());
    user.setEmail(registerRequest.getEmail());
    user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    user.setRole("USER");
    userRepository.save(user);

    return ResponseEntity.ok(new LoginResponse(user));
  }

  public ResponseEntity<?> login(LoginRequest loginRequest) {

    Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

    if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
      return ResponseEntity.ok(new LoginResponse(user.get()));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
      .body(Map.of("error", "Invalid credentials"));
  }
}