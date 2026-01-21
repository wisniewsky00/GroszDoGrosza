package pl.groszdogrosza.backend.transaction.asset.gold;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import pl.groszdogrosza.backend.dto.GoldPriceResponse;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class GoldNBPClient {

    private final RestClient nbpRestClient;

    private static final Pattern PRICE_PATTERN =
            Pattern.compile("<Cena>([0-9.]+)</Cena>");
    private static final Pattern DATE_PATTERN =
            Pattern.compile("<Data>([^<]+)</Data>");

    public Optional<GoldPriceResponse> tryGetLatestGoldPrice() {
        try {
            String xml = nbpRestClient
                    .get()
                    .uri("/cenyzlota")
                    .retrieve()
                    .body(String.class);

            Matcher priceMatcher = PRICE_PATTERN.matcher(xml);
            Matcher dateMatcher = DATE_PATTERN.matcher(xml);

            if (!priceMatcher.find() || !dateMatcher.find()) {
                log.warn("NBP gold XML malformed");
                return Optional.empty();
            }

            return Optional.of(
                    new GoldPriceResponse(
                            dateMatcher.group(1),
                            new BigDecimal(priceMatcher.group(1))
                    )
            );

        } catch (Exception e) {
            log.warn("Failed to fetch gold price from NBP", e);
            return Optional.empty();
        }
    }
}



