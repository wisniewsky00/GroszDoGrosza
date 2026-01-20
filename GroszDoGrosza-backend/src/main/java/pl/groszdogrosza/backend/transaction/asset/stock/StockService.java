package pl.groszdogrosza.backend.transaction.asset.stock;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.currency.CurrencyService;
import pl.groszdogrosza.backend.dto.CurrencyRateResult;
import pl.groszdogrosza.backend.dto.StockPriceResult;
import pl.groszdogrosza.backend.dto.StockSearchResult;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockService {

    private final AlphaVantageClient client;
    private final CurrencyService currencyService;

    public List<StockSearchResult> search(String q) {
        return client.search(q);
    }

    public StockPriceResult price(String symbol) {
        return client.getLatestPrice(symbol)
                .map(priceUsd -> {

                    CurrencyRateResult rateResult = currencyService.getUsdToPln();
                    if (!rateResult.fromApi()) {
                        return StockPriceResult.fallback("Nie udało się pobrać kursu USD/PLN");
                    }

                    BigDecimal usdToPln = rateResult.rate();

                    return StockPriceResult.api(
                            symbol,
                            priceUsd,
                            "USD",
                            priceUsd.multiply(usdToPln),
                            LocalDate.now().toString()
                    );
                })
                .orElseGet(() ->
                        StockPriceResult.fallback("Nie znaleziono symbolu: " + symbol)
                );
    }
}

