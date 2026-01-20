package pl.groszdogrosza.backend.model;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.ModelWeightRequest;
import pl.groszdogrosza.backend.dto.ModelWeightResponse;
import pl.groszdogrosza.backend.portfolio.Portfolio;
import pl.groszdogrosza.backend.portfolio.PortfolioRepository;
import pl.groszdogrosza.backend.user.User;
import pl.groszdogrosza.backend.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios/{portfolioId}/model-weights")
@RequiredArgsConstructor
public class ModelWeightController {

    private final ModelWeightService service;
    private final UserRepository userRepo;
    private final PortfolioRepository portfolioRepo;

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
    public List<ModelWeightResponse> get(@PathVariable Long portfolioId) {
        Portfolio portfolio = getOwnedPortfolio(portfolioId);
        return service.getForPortfolio(portfolio.getId());
    }

    @PutMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void save(
            @PathVariable Long portfolioId,
            @RequestBody List<ModelWeightRequest> body
    ) {
        Portfolio portfolio = getOwnedPortfolio(portfolioId);
        service.saveForPortfolio(portfolio, body);
    }
}
