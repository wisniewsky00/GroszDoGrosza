package pl.groszdogrosza.backend.transaction.asset.stock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import pl.groszdogrosza.backend.dto.StockSearchResult;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlphaVantageClient {

    private final RestClient alphaVantageRestClient;

    private String apiKey="LADHI4FLR1PESHDV";

    public List<StockSearchResult> search(String keywords) {
        try {
            Map res = alphaVantageRestClient.get()
                    .uri(uri -> uri
                            .path("/query")
                            .queryParam("function", "SYMBOL_SEARCH")
                            .queryParam("keywords", keywords)
                            .queryParam("apikey", apiKey)
                            .build()
                    )
                    .retrieve()
                    .body(Map.class);

            List<Map<String, String>> matches =
                    (List<Map<String, String>>) res.get("bestMatches");

            if (matches == null) return List.of();

            return matches.stream()
                    .map(m -> new StockSearchResult(
                            m.get("1. symbol"),
                            m.get("2. name"),
                            m.get("4. region"),
                            m.get("8. currency"),
                            m.get("3. type")
                    ))
                    .toList();

        } catch (Exception e) {
            log.warn("Symbol search failed", e);
            return List.of();
        }
    }

    public Optional<BigDecimal> getLatestPrice(String symbol) {
        try {
            Map res = alphaVantageRestClient.get()
                    .uri(uri -> uri
                            .path("/query")
                            .queryParam("function", "GLOBAL_QUOTE")
                            .queryParam("symbol", symbol)
                            .queryParam("apikey", apiKey)
                            .build()
                    )
                    .retrieve()
                    .body(Map.class);

            Map<String, String> quote =
                    (Map<String, String>) res.get("Global Quote");

            if (quote == null) return Optional.empty();

            return Optional.of(new BigDecimal(quote.get("05. price")));

        } catch (Exception e) {
            log.warn("Price fetch failed", e);
            return Optional.empty();
        }
    }
}

