package pl.groszdogrosza.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(
                userRepository.findByEmail(auth.getName()).orElseThrow()
        );
    }


    @PatchMapping("/username")
    public ResponseEntity<?> updateUsername(@RequestBody Map<String,String> body, Authentication auth) {
        String username = body.get("username");
        if (username == null || username.isBlank()) return ResponseEntity.badRequest().body(Map.of("error", "NO_USERNAME"));

        String currentEmail = auth.getName();
        var userOpt = userRepository.findByEmail(currentEmail);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).build();
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "USERNAME_TAKEN"));
        }

        var user = userOpt.get();
        user.setUsername(username);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "OK"));
    }

    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String,String> body,
            Authentication auth
    ) {
        if (auth == null) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "UNAUTHORIZED"));
        }

        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");
        if (oldPassword == null || newPassword == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error","INVALID_BODY"));
        }

        String currentEmail = auth.getName();
        var userOpt = userRepository.findByEmail(currentEmail);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        var user = userOpt.get();
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "INVALID_PASSWORD"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message","PASSWORD_CHANGED")
        );
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<?> deleteAccount(@RequestBody Map<String,String> body, Authentication auth) {
        String password = body.get("password");
        if (password == null) return ResponseEntity.badRequest().body(Map.of("error","NO_PASSWORD"));

        String currentEmail = auth.getName();
        var userOpt = userRepository.findByEmail(currentEmail);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).build();

        var user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error","INVALID_PASSWORD"));
        }

        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }
}
