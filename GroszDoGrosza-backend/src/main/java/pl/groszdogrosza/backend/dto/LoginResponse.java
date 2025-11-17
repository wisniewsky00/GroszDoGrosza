package pl.groszdogrosza.backend.dto;

import lombok.Data;
import pl.groszdogrosza.backend.user.User;

@Data
public class LoginResponse {
  private UserDto user;
  private String token;

  public LoginResponse(User user, String token) {
    this.user = new UserDto(user);
    this.token = token;
  }
}
