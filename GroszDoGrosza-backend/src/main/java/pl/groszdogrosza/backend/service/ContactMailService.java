package pl.groszdogrosza.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.dto.ContactRequest;

@Service
public class ContactMailService {

    private final JavaMailSender mailSender;

    public ContactMailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactMail(ContactRequest request) {

        System.out.println("wywołanie send contact mail");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo("hello.groszdogrosza@gmail.com");
        mail.setSubject("Nowa wiadomość z formularza – GroszDoGrosza");
        mail.setText("""
            Imię: %s
            Email: %s

            Wiadomość:
            %s
            """.formatted(
                request.name(),
                request.email(),
                request.message()
        ));

        mailSender.send(mail);
    }

    public void sendConfirmation(ContactRequest request) {

        SimpleMailMessage confirmation = new SimpleMailMessage();
        confirmation.setTo(request.email());
        confirmation.setSubject("Dziękujemy za wiadomość – GroszDoGrosza");
        confirmation.setText("""
                Cześć!
          
                Dziękujemy za wiadomość i kontakt z zespołem GroszDoGrosza 👋 \s
            
                Odpowiadamy na wszystkie wiadomości tak szybko, jak to możliwe.
                Zwykle zajmuje nam to do 1–2 dni roboczych.
                
                Jeśli Twoja wiadomość dotyczy:
                – treści edukacyjnych lub artykułów,
                – sugestii tematów,
                – współpracy lub partnerstwa,
                
                na pewno wrócimy do Ciebie z odpowiedzią.
                
                Pozdrawiamy \s
                Zespół GroszDoGrosza \s
                📩 hello.groszdogrosza@gmail.com
            """.formatted(request.name()));

        mailSender.send(confirmation);
    }
}
