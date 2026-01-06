package pl.groszdogrosza.backend.verification;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.user.User;
import pl.groszdogrosza.backend.user.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class VerificationService {

    private final VerificationTokenRepository tokenRepo;
    private final UserRepository userRepo;
    private final JavaMailSender mailSender;

    public VerificationService(VerificationTokenRepository tokenRepo, UserRepository userRepo, JavaMailSender mailSender) {
        this.tokenRepo = tokenRepo;
        this.userRepo = userRepo;
        this.mailSender = mailSender;
    }

    @Transactional
    public void createAndSendCode(User user) {
        tokenRepo.deleteAllByUser(user);
        String codeStr = generate6Digit();

        VerificationToken token = VerificationToken.builder()
                .user(user)
                .code(codeStr)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .used(false)
                .pendingEmail(null)
                .build();

        tokenRepo.save(token);
        sendVerificationMail(user.getEmail(), codeStr);
    }

    @Transactional
    public void createAndSendCodeForEmailChange(User user, String newEmail) {
        tokenRepo.deleteAllByUser(user);
        String codeStr = generate6Digit();

        VerificationToken token = VerificationToken.builder()
                .user(user)
                .code(codeStr)
                .pendingEmail(newEmail) // store target email
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .used(false)
                .build();

        tokenRepo.save(token);

        // Send to CURRENT (existing) email address
        String subject = "Potwierdź zmianę e-maila – GroszDoGrosza";
        String body = """
              <div style="font-family: Arial, sans-serif; line-height: 1.6">
                <h2>Zmiana adresu e-mail</h2>
                <p>Otrzymałeś prośbę o zmianę adresu e-mail na: <strong>%s</strong></p>
                <p>Twój kod weryfikacyjny:</p>
                <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">%s</p>
                <p>Kod jest ważny przez <strong>15 minut</strong>.</p>
                <hr/>
                <p style="color: #b91c1c; font-weight: bold;">Nie udostępniaj tego kodu nikomu.</p>
                <p>Pozdrawiamy<br/><strong>Zespół GroszDoGrosza</strong></p>
              </div>""".formatted(newEmail, codeStr);

        sendHtmlMail(user.getEmail(), subject, body);
    }

    @Transactional
    public boolean verifyCode(String email, String code) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Not found"));
        Optional<VerificationToken> vOpt = tokenRepo.findByUserAndCodeAndUsedFalse(user, code);

        if (vOpt.isEmpty()) return false;
        VerificationToken token = vOpt.get();
        if (token.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        token.setUsed(true);
        tokenRepo.save(token);

        user.setEmailVerified(true);
        userRepo.save(user);

        return true;
    }

    @Transactional
    public boolean verifyEmailChange(String currentEmail, String newEmail, String code) {
        User user = userRepo.findByEmail(currentEmail).orElseThrow(() -> new RuntimeException("Not found"));
        Optional<VerificationToken> vOpt = tokenRepo.findByUserAndCodeAndPendingEmailAndUsedFalse(user, code, newEmail);

        if (vOpt.isEmpty()) return false;
        VerificationToken token = vOpt.get();
        if (token.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        token.setUsed(true);
        tokenRepo.save(token);

        // Update email and mark verified
        user.setEmail(newEmail);
        user.setEmailVerified(true);
        userRepo.save(user);

        return true;
    }

    @Transactional
    public void resendCode(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Not found"));
        tokenRepo.deleteAllByUser(user);
        createAndSendCode(user);
    }

    @Transactional
    public void resendEmailChangeCode(String email, String pendingEmail) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Not found"));
        tokenRepo.deleteAllByUser(user);
        createAndSendCodeForEmailChange(user, pendingEmail);
    }

    /* ---- helpers ---- */
    private String generate6Digit() {
        int code = new Random().nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    private void sendVerificationMail(String to, String code) {
        String subject = "Potwierdź adres e-mail – GroszDoGrosza";
        String body = """
              <div style="font-family: Arial, sans-serif; line-height: 1.6">
                <h2>Potwierdzenie adresu e-mail</h2>
                <p>Twój kod weryfikacyjny:</p>
                <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">%s</p>
                <p>Kod jest ważny przez <strong>15 minut</strong>.</p>
                <hr />
                <p style="color: #b91c1c; font-weight: bold;">Nie udostępniaj tego kodu nikomu.</p>
                <p>Pozdrawiamy<br/><strong>Zespół GroszDoGrosza</strong></p>
              </div>""".formatted(code);

        sendHtmlMail(to, subject, body);
    }

    private void sendHtmlMail(String to, String subject, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Nie udało się wysłać maila", e);
        }
    }
}
