package pl.groszdogrosza.backend.dto;

public record ContactRequest(
        String name,
        String email,
        String message
) {
}
