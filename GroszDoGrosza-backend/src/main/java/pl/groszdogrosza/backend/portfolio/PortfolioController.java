package pl.groszdogrosza.backend.portfolio;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.CreatePortfolioRequest;
import pl.groszdogrosza.backend.dto.PortfolioDto;
import pl.groszdogrosza.backend.dto.UpdatePortfolioRequest;
import pl.groszdogrosza.backend.user.User;
import pl.groszdogrosza.backend.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    private final PortfolioRepository portfolioRepo;
    private final UserRepository userRepo;

    public PortfolioController(
            PortfolioRepository portfolioRepo,
            UserRepository userRepo
    ) {
        this.portfolioRepo = portfolioRepo;
        this.userRepo = userRepo;
    }

    private User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("UNAUTHORIZED");
        }
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("UNAUTHORIZED"));
    }

    private Portfolio getOwnedPortfolio(Long id) {
        Portfolio p = portfolioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("NOT_FOUND"));

        if (!p.getOwner().getId().equals(currentUser().getId())) {
            throw new RuntimeException("FORBIDDEN");
        }
        return p;
    }

    @GetMapping
    public List<PortfolioDto> list() {
        return portfolioRepo
                .findAllByOwnerId(currentUser().getId())
                .stream()
                .map(PortfolioDto::fromEntity)
                .toList();
    }

    @PostMapping
    public PortfolioDto create(@RequestBody CreatePortfolioRequest body) {
        if (body.name() == null || body.name().isBlank()) {
            throw new RuntimeException("NO_NAME");
        }

        Portfolio p = new Portfolio();
        p.setName(body.name());
        p.setDescription(body.description());
        p.setOwner(currentUser());

        portfolioRepo.save(p);
        return PortfolioDto.fromEntity(p);
    }

    @GetMapping("/{id}")
    public PortfolioDto get(@PathVariable Long id) {
        return PortfolioDto.fromEntity(getOwnedPortfolio(id));
    }

    @PutMapping("/{id}")
    public PortfolioDto update(
            @PathVariable Long id,
            @RequestBody UpdatePortfolioRequest body
    ) {
        Portfolio p = getOwnedPortfolio(id);

        if (body.name() == null || body.name().isBlank()) {
            throw new RuntimeException("NO_NAME");
        }

        p.setName(body.name().trim());
        p.setDescription(body.description());

        portfolioRepo.save(p);
        return PortfolioDto.fromEntity(p);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        portfolioRepo.delete(getOwnedPortfolio(id));
    }

}
