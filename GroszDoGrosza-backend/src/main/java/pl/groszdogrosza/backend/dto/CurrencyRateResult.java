package pl.groszdogrosza.backend.dto;

import java.math.BigDecimal;

public record CurrencyRateResult(
        String from,
        String to,
        BigDecimal rate,
        boolean fromApi,
        String error
) {
    public static CurrencyRateResult api(String from, String to, BigDecimal rate) {
        return new CurrencyRateResult(from, to, rate, true, null);
    }

    public static CurrencyRateResult fallback(String from, String to, String error) {
        return new CurrencyRateResult(from, to, null, false, error);
    }
}

