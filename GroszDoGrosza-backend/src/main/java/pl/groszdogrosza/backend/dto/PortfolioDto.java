package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.portfolio.Portfolio;

public record PortfolioDto(
        Long id,
        String name,
        String description
) {
    public static PortfolioDto fromEntity(Portfolio p) {
        return new PortfolioDto(
                p.getId(),
                p.getName(),
                p.getDescription()
        );
    }
}
