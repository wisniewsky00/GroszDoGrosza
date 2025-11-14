package pl.groszdogrosza.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import pl.groszdogrosza.backend.user.User;

@Data
@AllArgsConstructor
public class LoginResponse {
  private Long id;
  private String username;
  private String email;
  private String role;

  public LoginResponse(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.role = user.getRole();
  }
}
