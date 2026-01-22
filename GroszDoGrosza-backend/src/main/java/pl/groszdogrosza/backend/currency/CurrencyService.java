package pl.groszdogrosza.backend.currency;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.groszdogrosza.backend.dto.CurrencyRateResult;

import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
public class CurrencyService {

    private final NbpCurrencyClient currencyClient;

    public CurrencyRateResult getUsdToPln() {
        return getRate("USD", "PLN");
    }

    public CurrencyRateResult getRate(String from, String to) {

        if (!"PLN".equals(to)) {
            return CurrencyRateResult.fallback(
                    from,
                    to,
                    "NBP obsługuje tylko kursy względem PLN"
            );
        }

        return currencyClient.getRateToPln(from)
                .map(rate -> rate.setScale(2, RoundingMode.HALF_UP))
                .map(rate -> CurrencyRateResult.api(from, to, rate))
                .orElseGet(() ->
                        CurrencyRateResult.fallback(
                                from,
                                to,
                                "Nie udało się pobrać kursu z NBP"
                        )
                );
    }
}
