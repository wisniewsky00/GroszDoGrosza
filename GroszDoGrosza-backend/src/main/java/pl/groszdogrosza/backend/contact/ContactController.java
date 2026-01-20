package pl.groszdogrosza.backend.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.ContactRequest;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMailService mailService;

    public ContactController(ContactMailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping
    public ResponseEntity<?> sendContact(@RequestBody ContactRequest request) {

        if (request.name() == null || request.email() == null || request.message() == null) {
            return ResponseEntity.badRequest().build();
        }

        mailService.sendContactMail(request);
        mailService.sendConfirmation(request);

        return ResponseEntity.ok().build();
    }
}
