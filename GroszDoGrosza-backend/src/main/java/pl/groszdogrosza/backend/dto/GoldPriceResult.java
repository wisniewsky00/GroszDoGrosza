package pl.groszdogrosza.backend.dto;

import java.math.BigDecimal;

public record GoldPriceResult(
        BigDecimal pricePerGram,
        String date,
        boolean fromApi,
        String error
) {
    public static GoldPriceResult api(BigDecimal price, String date) {
        return new GoldPriceResult(price, date, true, null);
    }

    public static GoldPriceResult fallback(String error) {
        return new GoldPriceResult(null, null, false, error);
    }
}

