package pl.groszdogrosza.backend.verification;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.groszdogrosza.backend.user.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class VerificationController {

    private final VerificationService verificationService;
    private final UserRepository userRepo;

    public VerificationController(VerificationService verificationService, UserRepository userRepo) {
        this.verificationService = verificationService;
        this.userRepo = userRepo;
    }

    @PostMapping("/send-verification")
    public ResponseEntity<?> sendVerification(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        var userOpt = userRepo.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("NO_USER");
        verificationService.createAndSendCode(userOpt.get());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String code = body.get("code");
        boolean ok = verificationService.verifyCode(email, code);
        if (ok) return ResponseEntity.ok().build();
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("INVALID_CODE");
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resend(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        verificationService.resendCode(email);
        return ResponseEntity.ok().build();
    }
}

