package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.transaction.Transaction;
import pl.groszdogrosza.backend.transaction.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public record TransactionDto(
        Long id,
        String asset,
        TransactionType type,
        BigDecimal value,
        Map<String, Object> metadata,
        Instant transactionDate,
        Instant createdAt,
        Long sourceTransactionId
) {
    public static TransactionDto from(Transaction tx) {
        return new TransactionDto(
                tx.getId(),
                tx.getAsset().name(),
                tx.getType(),
                tx.getValue(),
                tx.getMetadata(),
                tx.getTransactionDate(),
                tx.getCreatedAt(),
                tx.getSourceTransaction() != null ? tx.getSourceTransaction().getId() : null
        );
    }
}

