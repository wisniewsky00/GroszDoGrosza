package pl.groszdogrosza.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.LoginRequest;
import pl.groszdogrosza.backend.dto.RegisterRequest;
import pl.groszdogrosza.backend.user.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  
  private final UserService userService;

  @Autowired
  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
    return userService.register(registerRequest);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    return userService.login(loginRequest);
  }
}

// {
//   "username": "Krzysiek",
//   "email": "krzysiek@example.com",
//   "password": "tajnehaslo"
// }
