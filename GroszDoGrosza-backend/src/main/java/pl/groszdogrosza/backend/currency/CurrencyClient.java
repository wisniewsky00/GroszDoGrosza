package pl.groszdogrosza.backend.currency;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class CurrencyClient {

    private final RestClient alphaVantageRestClient;

    private final String apiKey = "LADHI4FLR1PESHDV";

    public Optional<BigDecimal> getRate(String from, String to) {
        try {
            Map res = alphaVantageRestClient.get()
                    .uri(uri -> uri
                            .path("/query")
                            .queryParam("function", "CURRENCY_EXCHANGE_RATE")
                            .queryParam("from_currency", from)
                            .queryParam("to_currency", to)
                            .queryParam("apikey", apiKey)
                            .build()
                    )
                    .retrieve()
                    .body(Map.class);

            Map<String, String> rate =
                    (Map<String, String>) res.get("Realtime Currency Exchange Rate");

            if (rate == null) return Optional.empty();

            return Optional.of(new BigDecimal(rate.get("5. Exchange Rate")));

        } catch (Exception e) {
            log.warn("Currency rate fetch failed {} -> {}", from, to, e);
            return Optional.empty();
        }
    }
}
