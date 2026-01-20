package pl.groszdogrosza.backend.transaction;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.groszdogrosza.backend.dto.CreateTransactionRequest;
import pl.groszdogrosza.backend.dto.TransactionDto;
import pl.groszdogrosza.backend.dto.UpdateTransactionRequest;
import pl.groszdogrosza.backend.portfolio.Portfolio;
import pl.groszdogrosza.backend.portfolio.PortfolioRepository;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/portfolios/{portfolioId}/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionRepository repository;
    private final PortfolioRepository portfolioRepository;

    @PostMapping
    public TransactionDto create(
            @PathVariable Long portfolioId,
            @RequestBody CreateTransactionRequest req
    ) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow();

        Transaction tx = new Transaction();
        tx.setAsset(req.asset());
        tx.setValue(req.value());
        tx.setMetadata(req.metadata());
        tx.setTransactionDate(
                req.transactionDate() != null
                        ? req.transactionDate()
                        : Instant.now()
        );
        tx.setPortfolio(portfolio);

        return TransactionDto.from(repository.save(tx));
    }

    @GetMapping
    public List<TransactionDto> list(@PathVariable Long portfolioId) {
        return repository.findByPortfolioId(portfolioId)
                .stream()
                .map(TransactionDto::from)
                .toList();
    }

    @PutMapping("/{id}")
    public TransactionDto update(
            @PathVariable Long portfolioId,
            @PathVariable Long id,
            @RequestBody UpdateTransactionRequest req
    ) {
        Transaction tx = repository.findByIdAndPortfolioId(id, portfolioId);

        tx.setValue(req.value());
        tx.setMetadata(req.metadata());

        if (req.transactionDate() != null) {
            tx.setTransactionDate(req.transactionDate());
        }

        return TransactionDto.from(repository.save(tx));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

