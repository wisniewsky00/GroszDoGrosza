package pl.groszdogrosza.backend.verification;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.user.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/users/email")
public class EmailChangeController {

    private final VerificationService verificationService;
    private final UserRepository userRepo;

    public EmailChangeController(
            VerificationService verificationService,
            UserRepository userRepo
    ) {
        this.verificationService = verificationService;
        this.userRepo = userRepo;
    }

    /* =========================
       helper – pobranie emaila
       ========================= */
    private String getCurrentEmail() {
        Authentication auth = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("UNAUTHORIZED");
        }

        return auth.getName(); // subject z JWT = email
    }

    /* =========================
       1️⃣ request code
       ========================= */
    @PostMapping("/request")
    public ResponseEntity<?> requestEmailChange(
            @RequestBody Map<String, String> body
    ) {
        String newEmail = body.get("newEmail");
        if (newEmail == null || newEmail.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "NO_EMAIL"));
        }

        String currentEmail = getCurrentEmail();

        var userOpt = userRepo.findByEmail(currentEmail);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if (userRepo.findByEmail(newEmail).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "EMAIL_TAKEN"));
        }

        verificationService.createAndSendCodeForEmailChange(
                userOpt.get(),
                newEmail
        );

        return ResponseEntity.ok().build();
    }

    /* =========================
       2️⃣ verify code
       ========================= */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmailChange(
            @RequestBody Map<String, String> body
    ) {
        String newEmail = body.get("newEmail");
        String code = body.get("code");

        if (newEmail == null || code == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "INVALID_BODY"));
        }

        String currentEmail = getCurrentEmail();

        boolean ok = verificationService.verifyEmailChange(
                currentEmail,
                newEmail,
                code
        );

        if (!ok) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body(Map.of("error", "INVALID_CODE"));
        }

        return ResponseEntity.ok(
                Map.of("message", "EMAIL_CHANGED_RELOGIN_REQUIRED")
        );
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendEmailChange(
            @RequestBody Map<String, String> body
    ) {
        String newEmail = body.get("newEmail");
        if (newEmail == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "NO_EMAIL"));
        }

        String currentEmail = getCurrentEmail();

        verificationService.resendEmailChangeCode(
                currentEmail,
                newEmail
        );

        return ResponseEntity.ok().build();
    }
}
