package pl.groszdogrosza.backend.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public record UpdateTransactionRequest(
        BigDecimal value,
        Instant transactionDate,
        Map<String, Object> metadata
) {}
