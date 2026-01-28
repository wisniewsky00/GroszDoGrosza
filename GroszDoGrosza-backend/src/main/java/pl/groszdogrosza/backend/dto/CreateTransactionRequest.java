package pl.groszdogrosza.backend.dto;

import pl.groszdogrosza.backend.transaction.TransactionType;
import pl.groszdogrosza.backend.transaction.asset.AssetType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

public record CreateTransactionRequest(
        AssetType asset,
        TransactionType type,
        BigDecimal value,
        Instant transactionDate,
        Map<String, Object> metadata,
        Long sourceTransactionId
) {}


