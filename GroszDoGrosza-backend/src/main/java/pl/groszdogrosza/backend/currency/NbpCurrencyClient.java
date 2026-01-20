package pl.groszdogrosza.backend.currency;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
@Slf4j
public class NbpCurrencyClient {

    private final RestClient nbpRestClient;

    private static final Pattern MID_PATTERN =
            Pattern.compile("<Mid>([0-9.]+)</Mid>");

    public Optional<BigDecimal> getRateToPln(String currency) {
        try {
            String xml = nbpRestClient.get()
                    .uri("/exchangerates/rates/a/{code}", currency.toLowerCase())
                    .retrieve()
                    .body(String.class);

            Matcher matcher = MID_PATTERN.matcher(xml);
            if (!matcher.find()) {
                return Optional.empty();
            }

            return Optional.of(new BigDecimal(matcher.group(1)));

        } catch (Exception e) {
            log.warn("NBP rate fetch failed for {}", currency, e);
            return Optional.empty();
        }
    }
}
