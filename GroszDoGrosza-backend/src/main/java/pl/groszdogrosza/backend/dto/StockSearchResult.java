package pl.groszdogrosza.backend.dto;

public record StockSearchResult(
        String symbol,
        String name,
        String region,
        String currency,
        String type
) {}

