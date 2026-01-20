package pl.groszdogrosza.backend.model;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.dto.ModelWeightRequest;
import pl.groszdogrosza.backend.dto.ModelWeightResponse;
import pl.groszdogrosza.backend.portfolio.Portfolio;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ModelWeightService {

    private final ModelWeightRepository repository;

    public List<ModelWeightResponse> getForPortfolio(Long portfolioId) {
        return repository.findByPortfolioId(portfolioId)
                .stream()
                .map(w -> new ModelWeightResponse(
                        w.getAssetType(),
                        w.getWeight()
                ))
                .toList();
    }

    public void saveForPortfolio(
            Portfolio portfolio,
            List<ModelWeightRequest> request
    ) {
        BigDecimal sum = request.stream()
                .map(ModelWeightRequest::value)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (sum.compareTo(BigDecimal.valueOf(100)) != 0) {
            throw new IllegalArgumentException("Weights must sum to 100%");
        }

        repository.deleteByPortfolioId(portfolio.getId());

        request.forEach(r ->
                repository.save(
                        ModelWeight.builder()
                                .portfolio(portfolio)
                                .assetType(r.asset())
                                .weight(r.value())
                                .build()
                )
        );
    }
}