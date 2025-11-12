package pl.groszdogrosza.backend.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserRepository userRepository;
  
  @Autowired
  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @PostMapping("/test")
  public User createUser() {
    User user = User.builder()
      .username("Jan")
      .email("jan@example.com")
      .password("1234")
      .role("USER")
      .build();

    return userRepository.save(user);
  }

  @GetMapping
  public List<User> getAll() {
    return userRepository.findAll();
  }

}