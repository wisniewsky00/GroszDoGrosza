package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.transaction.Transaction;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public record TransactionDto(
        Long id,
        String asset,
        BigDecimal value,
        Map<String, Object> metadata,
        Instant transactionDate,
        Instant createdAt
) {
    public static TransactionDto from(Transaction tx) {
        return new TransactionDto(
                tx.getId(),
                tx.getAsset().name(),
                tx.getValue(),
                tx.getMetadata(),
                tx.getTransactionDate(),
                tx.getCreatedAt()
        );
    }
}

