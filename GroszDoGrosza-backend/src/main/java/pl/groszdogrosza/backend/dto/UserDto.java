package pl.groszdogrosza.backend.dto;

import lombok.Data;
import pl.groszdogrosza.backend.user.User;

@Data
public class UserDto {
  private Long id;
  private String username;
  private String email;
  private String role;

  public UserDto(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.role = user.getRole();
  }

}
