package pl.groszdogrosza.backend.transaction.asset.gold;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import pl.groszdogrosza.backend.dto.GoldPriceResponse;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoldNBPClient {

    private final RestClient nbpRestClient;

    public Optional<GoldPriceResponse> tryGetLatestGoldPrice() {
        try {
            GoldPriceResponse[] res = nbpRestClient
                    .get()
                    .uri("/cenyzlota")
                    .retrieve()
                    .body(GoldPriceResponse[].class);

            if (res == null || res.length == 0) {
                log.warn("NBP returned empty response");
                return Optional.empty();
            }

            return Optional.of(res[0]);
        } catch (Exception e) {
            log.warn("Failed to fetch gold price from NBP", e);
            return Optional.empty();
        }
    }
}


