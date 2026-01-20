package pl.groszdogrosza.backend.transaction.asset.crypto;

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
public class CoinGeckoClient {

    private final RestClient coinGeckoRestClient;

    public Optional<BigDecimal> tryGetPricePln(String coinId) {
        try {
            Map<String, Map<String, Object>> res =
                    coinGeckoRestClient.get()
                            .uri(uriBuilder -> uriBuilder
                                    .path("/simple/price")
                                    .queryParam("ids", coinId)
                                    .queryParam("vs_currencies", "pln")
                                    .build()
                            )
                            .retrieve()
                            .body(Map.class);

            if (res == null || !res.containsKey(coinId)) {
                return Optional.empty();
            }

            Object raw = res.get(coinId).get("pln");
            if (raw == null) {
                return Optional.empty();
            }

            return Optional.of(new BigDecimal(raw.toString()));
        } catch (Exception e) {
            log.warn("Failed to fetch crypto price for {}", coinId, e);
            return Optional.empty();
        }
    }
}

