package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.user.User;

public record UserMeDto(
        Long id,
        String username,
        String email,
        String role,
        Boolean emailVerified
) {
    public static UserMeDto from(User user) {
        return new UserMeDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getEmailVerified()
        );
    }
}

