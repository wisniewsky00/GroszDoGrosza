package pl.groszdogrosza.backend.verification;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.groszdogrosza.backend.user.User;
import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findFirstByUserAndUsedFalseOrderByCreatedAtDesc(User user);
    Optional<VerificationToken> findByUserAndCodeAndUsedFalse(User user, String code);
    Optional<VerificationToken> findByUserAndCodeAndPendingEmailAndUsedFalse(User user, String code, String pendingEmail);
    void deleteAllByUser(User user);
}
