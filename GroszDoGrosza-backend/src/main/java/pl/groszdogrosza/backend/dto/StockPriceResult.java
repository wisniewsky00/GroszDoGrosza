package pl.groszdogrosza.backend.dto;

import java.math.BigDecimal;

public record StockPriceResult(
        String symbol,
        BigDecimal price,
        String currency,
        BigDecimal pricePln,
        String date,
        boolean fromApi,
        String error
) {
    public static StockPriceResult api(
            String symbol,
            BigDecimal price,
            String currency,
            BigDecimal pricePln,
            String date
    ) {
        return new StockPriceResult(symbol, price, currency, pricePln, date, true, null);
    }

    public static StockPriceResult fallback(String error) {
        return new StockPriceResult(null, null, null, null, null, false, error);
    }
}

