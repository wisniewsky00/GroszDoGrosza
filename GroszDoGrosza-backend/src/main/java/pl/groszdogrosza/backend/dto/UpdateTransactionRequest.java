package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.transaction.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public record UpdateTransactionRequest(
        TransactionType type,
        BigDecimal value,
        Instant transactionDate,
        Map<String, Object> metadata,
        Long sourceTransactionId
) {}
