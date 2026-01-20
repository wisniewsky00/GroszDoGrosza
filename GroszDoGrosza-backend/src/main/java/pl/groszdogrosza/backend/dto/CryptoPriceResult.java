package pl.groszdogrosza.backend.dto;

import java.math.BigDecimal;

public record CryptoPriceResult(
        String coinId,
        String name,
        BigDecimal pricePln,
        boolean fromApi,
        String error
) {
    public static CryptoPriceResult api(String coinId, BigDecimal price) {
        return new CryptoPriceResult(coinId, coinId, price, true, null);
    }

    public static CryptoPriceResult fallback(String coinId, String error) {
        return new CryptoPriceResult(coinId, null, null, false, error);
    }
}
