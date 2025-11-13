package pl.groszdogrosza.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.user.User;

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
  public User register(@RequestBody User user) {
    return userService.registerUser(user);
  }

  @PostMapping("/login")
  public User login(@RequestBody User loginRequest) {
    return userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword())
      .orElseThrow(() -> new RuntimeException("Invalid credentials"));
  }
}
