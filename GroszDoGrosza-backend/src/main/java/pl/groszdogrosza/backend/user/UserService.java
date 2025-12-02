package pl.groszdogrosza.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.dto.LoginRequest;
import pl.groszdogrosza.backend.dto.LoginResponse;
import pl.groszdogrosza.backend.dto.RegisterRequest;
import pl.groszdogrosza.backend.service.JwtService;
import java.util.Map;

@Service
public class UserService {
  
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private JwtService jwtService;

  @Autowired
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtService = jwtService;
  }

  public ResponseEntity<?> register(RegisterRequest registerRequest) {

    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", "Podany adres e-mail jest już zajęty!"));
    } else if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", "Podana nazwa użytkownika jest już zajęta!"));
    }

    User user = new User();
    user.setUsername(registerRequest.getUsername());
    user.setEmail(registerRequest.getEmail());
    user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    user.setRole("USER");
    userRepository.save(user);

    return ResponseEntity.ok(new LoginResponse(user, jwtService.generateToken(user.getEmail())));
  }

  public ResponseEntity<?> login(LoginRequest loginRequest) {

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
    } catch(Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }

    User user = userRepository.findByEmail(loginRequest.getEmail())
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    String token = jwtService.generateToken(user.getEmail());
    return ResponseEntity.ok(new LoginResponse(user, token));
  }

}