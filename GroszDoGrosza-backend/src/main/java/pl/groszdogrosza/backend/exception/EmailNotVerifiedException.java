package pl.groszdogrosza.backend.exception;

public class EmailNotVerifiedException extends RuntimeException {
    public EmailNotVerifiedException(String emailNotVerified) {
        super("EMAIL_NOT_VERIFIED");
    }
}
